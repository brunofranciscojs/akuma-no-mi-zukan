import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const imagesDir = path.join(projectRoot, 'src/assets/images/fruits');
const jsonPath = path.join(projectRoot, 'src/assets/akumanomi.json');

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

async function getAverageColor(imagePath) {
    try {
        const ext = path.extname(imagePath).toLowerCase();
        
        if (ext === '.svg') {
            const svg = fs.readFileSync(imagePath, 'utf-8');
            const hexMatch = svg.match(/#([0-9a-fA-F]{6})/g);
            if (hexMatch && hexMatch.length > 0) {
                return hexMatch[0].toLowerCase();
            }
            return '#976f47';
        }

        const buffer = await sharp(imagePath)
            .resize(100, 100, { fit: 'cover' })
            .removeAlpha()
            .raw()
            .toBuffer();

        let r = 0, g = 0, b = 0, count = 0;
        
        for (let i = 0; i < buffer.length; i += 3) {
            const pr = buffer[i];
            const pg = buffer[i + 1];
            const pb = buffer[i + 2];
            
            if (pr > 20 || pg > 20 || pb > 20) {
                r += pr;
                g += pg;
                b += pb;
                count++;
            }
        }

        if (count === 0) return '#976f47';

        return rgbToHex(Math.round(r / count), Math.round(g / count), Math.round(b / count));
    } catch (e) {
        console.error(`Error: ${path.basename(imagePath)}:`, e.message);
        return '#976f47';
    }
}

async function main() {
    const akumanomi = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    
    console.log(`Processing ${akumanomi.length} fruits...`);
    
    let processed = 0;
    
    for (const fruit of akumanomi) {
        const imagePath = path.join(imagesDir, fruit.localImg);
        
        if (!fs.existsSync(imagePath)) {
            continue;
        }

        fruit.color = await getAverageColor(imagePath);
        
        processed++;
        if (processed % 20 === 0) {
            console.log(`Processed ${processed}/${akumanomi.length}`);
        }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(akumanomi, null, 2));
    console.log(`Done! Added color to ${processed} fruits.`);
}

main();