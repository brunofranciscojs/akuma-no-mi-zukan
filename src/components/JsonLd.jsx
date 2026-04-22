export function JsonLd({ data }) {
    return (
        <script
            async={false}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}