import fs from 'node:fs'
import path from "node:path";

const output_path = path.join(process.cwd(), 'public', 'cache', 'demon-list.json')

const page_size = 100
const max_demons = 1000

async function fetchPage(after: number, limit: number) {
    const params = new URLSearchParams({
        limit: String(limit)
    })

    if(after > 0) {
        params.set('after', String(after))
    }

    const url = `https://pointercrate.com/api/v2/demons/listed/?${params.toString()}`

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'User-Agent': 'Mozilla/5.0',
        }
    })

    if (!response.ok) {
        const txtError = await response.text()
        throw new Error(`Failed to fetch Demoin List ${response.status}: ${txtError.slice(0, 300)}`)
    }

    return response.json()
}

async function main() {
    const demons: unknown[] = []

    for (let after = 0; after < max_demons; after += page_size) {
        console.log(`Downloading demon list after: ${after}...`);

        const page = await fetchPage(after, page_size)

        if(!Array.isArray(page) || page.length === 0) {
            break;
        }

        demons.push(...page)

        if(page.length < page_size) {
            break;
        }
    }

    fs.mkdirSync(path.dirname(output_path), { recursive: true })
    fs.writeFileSync(
        output_path, 
        JSON.stringify(
            { 
                updatedt: new Date().toISOString(),
                source: `https://pointercrate.com/api/v2/demons/listed/`,
                total: demons.length,
                demons
            }, null, 2
        ), 'utf-8'
    )

    console.log(`Demon List updated with ${demons.length} Demons.`)
}

// Script Execution
try {
    main()
} catch (e) {
    console.error(e)
    process.exit(1)
}