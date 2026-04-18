import { akumasnomi } from '../lib/data';

export default function sitemap() {
    const baseUrl = 'https://devilfruitencyclopedia.vercel.app';

    // Get all fruit routes
    const fruitUrls = akumasnomi.map((fruta) => ({
        url: `${baseUrl}/fruit/${fruta.id}`,
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
