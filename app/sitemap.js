import { akumasnomi } from '../lib/data';

export default function sitemap() {
    const baseUrl = 'https://devilfruitencyclopedia.vercel.app';
    const slugify = (text) => {
        return text.toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^a-z0-9-]/g, '')     // Remove all non-word chars
            .replace(/-+/g, '-')           // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    // Get all fruit routes
    const fruitUrls = akumasnomi.map((fruta) => ({
        url: `${baseUrl}/fruit/${slugify(fruta.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...fruitUrls,
    ];
}
