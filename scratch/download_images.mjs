import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = 'c:/Users/Bruno/OneDrive/Documentos/GitHub/akuma-no-mi-zukan';
const akumanomiPath = path.join(rootPath, 'src/assets/akumanomi.json');
const imagesDir = path.join(rootPath, 'src/assets/images/fruits');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(url, dest) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
}

async function run() {
    const data = JSON.parse(fs.readFileSync(akumanomiPath, 'utf8'));
    console.log(`Starting download of ${data.length} images...`);

    for (let i = 0; i < data.length; i++) {
        const fruit = data[i];
        if (!fruit.img) continue;

        try {
            const url = fruit.img;
            const ext = url.split('.').pop().split('?')[0] || 'png';
            const filename = `${fruit.id}.${ext}`;
            const dest = path.join(imagesDir, filename);

            if (!fs.existsSync(dest)) {
                await downloadImage(url, dest);
                console.log(`[${i+1}/${data.length}] Downloaded ${filename}`);
            } else {
                console.log(`[${i+1}/${data.length}] Skipped ${filename} (exists)`);
            }

            // Update fruit object
            fruit.localImg = filename;
        } catch (err) {
            console.error(`Error downloading image for ${fruit.id}:`, err.message);
        }
    }

    fs.writeFileSync(akumanomiPath, JSON.stringify(data, null, 2));
    console.log('Finished downloading images and updating JSON.');
}

run();
