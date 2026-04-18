import { NextResponse } from 'next/server';
import { akumasnomi } from '../../lib/data';

export async function GET() {
    // Condensed data specifically for AI agents to understand the catalog without scraping 200+ pages
    const aiData = akumasnomi.map(fruta => ({
        id: fruta.id,
        name: fruta.name,
        type: fruta.type,
        engName: fruta.engName,
        jpName: fruta.jpName,
        description: fruta.desc,
        owner: fruta.owner,
        related: fruta.relatedFruits
    }));

    return NextResponse.json({
        total: aiData.length,
        fruits: aiData
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
        }
    });
}
