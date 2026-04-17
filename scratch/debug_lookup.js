import { getFruitBySlug, akumasnomi, slugify } from './lib/data.js';

const testIds = ['ame-ame-no-mi', 'ami-ami-no-mi', 'ato-ato-no-mi'];

testIds.forEach(id => {
    const fruit = getFruitBySlug(id);
    if (fruit) {
        console.log(`ID: ${id} -> Name: ${fruit.name}, localImg: ${fruit.localImg}`);
    } else {
        console.log(`ID: ${id} -> NOT FOUND`);
    }
});
