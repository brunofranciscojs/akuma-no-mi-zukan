import fs from 'fs';
import path from 'path';

const rootPath = 'c:/Users/Bruno/OneDrive/Documentos/GitHub/akuma-no-mi-zukan';
const akumanomiPath = path.join(rootPath, 'src/assets/akumanomi.json');
const csvPath = 'c:/Users/Bruno/.gemini/antigravity/brain/8bdda22f-e631-447a-8a3b-4f7d4b392019/.system_generated/steps/307/content.md';

function parseCSV(content) {
    const lines = content.split('\n');
    const dataStartingLine = lines.findIndex(l => l.startsWith('fruitId,japanese_name,owner'));
    if (dataStartingLine === -1) return [];

    const headers = lines[dataStartingLine].split(',');
    const results = [];
    
    for (let i = dataStartingLine + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV split (not handling escaped commas in this specific case unless needed)
        // Actually, looking at the data, the 'power' and 'desc' columns have quotes and commas.
        // We only care about japanese_name (index 1), owner (index 2), and english name (index 3).
        
        // Let's use a regex to split by comma but ignore commas inside quotes
        const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
        
        // Wait, the match above is tricky. Let's do a slightly better one.
        const csvRegex = /(".*?"|[^,]+)/g;
        const matches = [...line.matchAll(csvRegex)].map(m => m[0].replace(/^"|"$/g, '').trim());

        if (matches.length > 3) {
            results.push({
                jp: matches[1],
                owner: matches[2],
                eng: matches[3]
            });
        }
    }
    return results;
}

function run() {
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const spreadsheetData = parseCSV(csvContent);
    const akumanomi = JSON.parse(fs.readFileSync(akumanomiPath, 'utf8'));

    console.log(`Loaded ${spreadsheetData.length} entries from spreadsheet.`);
    console.log(`Processing ${akumanomi.length} fruits from JSON.`);

    let matchedCount = 0;
    
    const updatedAkumanomi = akumanomi.map(fruit => {
        // Find match in spreadsheet
        const match = spreadsheetData.find(s => 
            (s.jp && s.jp.toLowerCase() === fruit.name.toLowerCase()) || 
            (s.eng && s.eng.toLowerCase() === fruit.engName.toLowerCase())
        );

        const newFruit = { ...fruit };
        if (match && match.owner && match.owner !== 'NULL' && match.owner !== 'Null') {
            newFruit.owner = match.owner;
            matchedCount++;
        } else {
            newFruit.owner = 'desconhecido';
        }
        return newFruit;
    });

    fs.writeFileSync(akumanomiPath, JSON.stringify(updatedAkumanomi, null, 2));
    console.log(`Successfully matched ${matchedCount} owners. ${akumanomi.length - matchedCount} set to unknown.`);
}

run();
