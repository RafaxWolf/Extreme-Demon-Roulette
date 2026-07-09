import path from "node:path";

const output_path = path.join(process.cwd(), 'public', 'cache', 'demon-list.json')

const page_size = 100
const max_demons = 1000

async function fetchPage(after: number, limit: number) {
    const url = `https://pointercrate.com/api/v2/demons/listed/?limit=${limit}&after=${after}`

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'User-Agent': 'Mozilla/5.0',
        }
    })

    if (!response.ok) {
        console.error('Failed to fetch demons:', response.status, response.statusText);
        console.error(await response.text());
        return [];
    }

    return response.json()
}