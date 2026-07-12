import fs from 'node:fs'
import path from "node:path";

const output_path = path.join(process.cwd(), 'public', 'cache', 'demon-list.json')

const PAGE_SIZE = 100
const MAX_DEMONS = 1000

async function fetchPage(after: number, limit: number) {
    const params = new URLSearchParams({
        limit: String(limit)
    })

    if(after > 0) {
        params.set('after', String(after))
    }

    const url = `https://pointercrate.com/v2/demons/listed/?${params.toString()}`

    const response = await fetch(url);

    if (!response.ok) {
        const txtError = await response.text()
        throw new Error(`Failed to fetch Demoin List ${response.status}: ${txtError.slice(0, 300)}`)
    }

    return response.json()
}

async function main() {
    const demons: unknown[] = [];

    for (let after = 0; after < MAX_DEMONS; after += PAGE_SIZE) {
        console.log(`Descargando demonios desde after=${after}...`);

        const page = await fetchPage(after, PAGE_SIZE);

        if (!Array.isArray(page) || page.length === 0) {
            break;
        }

        demons.push(...page);

        if (page.length < PAGE_SIZE) {
            break;
        }
    }

    fs.mkdirSync(path.dirname(output_path), { recursive: true })

    fs.writeFileSync(
        output_path, 
        JSON.stringify(
            { 
                updatedt: new Date().toISOString(),
                source: `https://api.demonlist.org/level/classic/list`,
                total: demons.length,
                demons
            }, null, 2
        ),
        'utf-8'
    )

    console.log(`Demon List updated with ${demons.length} Demons.`)
}

// Script Execution
main().catch(err => {
    console.error(err)
    process.exit(1)
})