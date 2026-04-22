import Link from 'next/link'
import { slugify, get4Random, getFruitsByType } from '../../lib/data'

const SAMPLES = {
    paramecia: get4Random(getFruitsByType('Paramecia')),
    zoan: get4Random(getFruitsByType('Zoan')),
    logia: get4Random(getFruitsByType('Logia')),
}

const tabs = [
    {
        id: 'paramecia',
        label: 'Paramecia',
        jp: '超人系',
        anchor: '#paramecia',
        desc: 'The most common type — grants superhuman abilities by altering the body, producing substances, or modifying the environment. Paramecia users draw spells from any class.',
        subtypes: [
            { name: 'Body Enhancer', desc: 'Reshapes, stretches, or hardens the user\'s own body.', spell: 'Transmutation · Illusion · Abjuration', ex: 'Bara Bara no Mi (split body into floating parts)' },
            { name: 'Substance Generator', desc: 'Produces a specific material for offense, defense or battlefield control.', spell: 'Evocation · Conjuration · Abjuration', ex: 'Doku Doku no Mi (create and manipulate poison)' },
            { name: 'Environment Alterer', desc: 'Modifies properties of objects, creatures, or entire areas.', spell: 'Enchantment · Necromancy · Divination', ex: 'Noro Noro no Mi (slow movement of targets)' },
        ],
    },
    {
        id: 'zoan',
        label: 'Zoan',
        jp: '動物系',
        anchor: '#zoan',
        desc: 'Allows the user to transform into an animal or hybrid form. Zoan users undergo beast-like transformations similar to druids, gaining enhanced physical prowess.',
        subtypes: [
            { name: 'Standard Zoan', desc: 'Transforms into a real-world animal species — 3 forms: Human, Hybrid, and Beast.', spell: 'Druid-style transformations', ex: 'Hebi Hebi no Mi, Model: Anaconda' },
            { name: 'Ancient Zoan', desc: 'Rarer type — transforms into extinct or ancient animals.', spell: 'Enhanced physical power', ex: 'Neko Neko no Mi, Model: Saber Tiger' },
            { name: 'Mythical Zoan', desc: 'Exceptionally rare — transforms into mythological creatures with special powers.', spell: 'Unique mythic abilities', ex: 'Tori Tori no Mi, Model: Phoenix' },
        ],
    },
    {
        id: 'logia',
        label: 'Logia',
        jp: '自然系',
        anchor: '#logia',
        desc: 'The rarest type — users can transform into, create, and control a natural element. Logia users combine spellcasting with transformative elemental abilities.',
        subtypes: [
            { name: 'Solid Logia', desc: 'Element is a solid material — ice, earth, sand, etc.', spell: 'Elemental control + intangibility', ex: 'Hie Hie no Mi (ice)' },
            { name: 'Liquid Logia', desc: 'Element is a liquid — oil, water, syrup, etc.', spell: 'Fluid form + environmental control', ex: 'Ame Ame no Mi (candy syrup)' },
            { name: 'Gas Logia', desc: 'Element is a gas or plasma — fire, lightning, gas, etc.', spell: 'Intangibility + wide-area control', ex: 'Goro Goro no Mi (lightning)' },
        ],
    },
]

function FruitCard({ fruit }) {
    const mix = `color-mix(in srgb, ${fruit.color}, white 50%)`
    return (
        <Link href={`/fruit/${slugify(fruit.name)}`}
            style={{ '--color': fruit.localImg.includes('svg') ? 'var(--primary)' : fruit.color, '--mix': mix }}
            className="border border-(--primary)/30 hover:bg-(--bg-secondary)/50 backdrop-blur-sm duration-300 p-5 rounded-xl relative transition-colors flex gap-4 items-center no-underline text-inherit group"
        >
            <div className="w-16 h-16 shrink-0">
                <img src={`/images/fruits/${fruit.localImg}`} draggable="false" alt={fruit.name}
                    className="w-full h-full object-contain select-none dark:filter-none filter-[drop-shadow(0_0_20px_var(--mix))]"
                />
            </div>
            <div className="flex flex-col min-w-0 pr-2">
                <h3 className="font-black text-base text-(--primary) leading-tight text-balance">{fruit.name}</h3>
                <p className="text-sm text-(--text-primary) line-clamp-2 leading-snug">{fruit.excerpt}</p>
            </div>
        </Link>
    )
}

export default function WhatAreDevilFruits() {

    return (
        <main className="lg:min-w-360 min-w-full w-full mx-auto px-6 xl:px-12 pb-24 pt-28 flex flex-col lg:flex-row justify-between gap-12 h-full
            after:content-[''] after:fixed after:inset-0 after:w-full after:h-full after:bg-[url(/pattern.avif)] 
            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none">

            <section className="py-2 border-b border-(--primary)/20 mb-12 lg:sticky lg:top-32 h-dvh w-[85svw] lg:w-1/2">
                <p className="text-sm uppercase tracking-[.3em] text-(--primary) mb-4 font-sans">
                    One Piece Devil Fruits · Encyclopedia
                </p>
                <h1 className="text-3xl md:text-5xl font-serif text-(--primary) leading-[1.05] mb-6">
                    What Are<br />
                    Devil Fruits?
                </h1>
                <p className="text-md text-(--text-primary) max-w-2xl leading-relaxed mb-4">
                    Cursed treasures of the Grand Line, categorized into three distinct types,
                    they grant supernatural power purchased at the cost of the ocean itself.
                    When a character consumes a Devil Fruit, they gain supernatural abilities
                    almost immediately. However, this newfound power comes at a steep cost: a
                    profound vulnerability to seawater and seastone. These powers are
                    divided into three fundamental categories:
                </p>

                <div className="max-w-2xl border-l-2 border-(--primary)/20 pl-8 py-2 flex flex-col gap-6 my-10">
                    <div className="flex flex-col gap-5">
                        <p className="text-sm text-(--text-primary)/90 leading-relaxed">
                            <strong className="text-(--primary) uppercase tracking-widest text-[0.65rem] block mb-1">I. Paramecia</strong>
                            The most common type, granting superhuman abilities that alter the user's body, produce substances, or manipulate the environment.
                        </p>
                        <p className="text-sm text-(--text-primary)/90 leading-relaxed">
                            <strong className="text-(--primary) uppercase tracking-widest text-[0.65rem] block mb-1">II. Zoan</strong>
                            Allows the user to transform into an animal or human-animal hybrid, significantly enhancing their physical strength and primal instincts.
                        </p>
                        <p className="text-sm text-(--text-primary)/90 leading-relaxed">
                            <strong className="text-(--primary) uppercase tracking-widest text-[0.65rem] block mb-1">III. Logia</strong>
                            The rarest and most powerful class, permitting the user to transform their entire body into a natural element, creating and controlling it at will.
                        </p>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    {[
                        { key: 'paramecia', label: 'Paramecia' },
                        { key: 'zoan', label: 'Zoan' },
                        { key: 'logia', label: 'Logia' },
                    ].map(({ key, label }) => (
                        <Link key={key} href={`#${key}`}
                            className="text-sm px-4 py-1.5 rounded-full border border-(--primary)/40 text-(--primary) hover:bg-(--primary) hover:text-white transition-colors duration-200 cursor-pointer">
                            {label}
                        </Link>
                    ))}
                    <Link href="/" className="text-sm px-4 py-1.5 rounded-full bg-(--primary) text-white hover:opacity-80 transition-opacity duration-200">
                        Browse all fruits →
                    </Link>
                </nav>
            </section>

            <div className="w-[85svw] lg:w-1/2">
                <section className="mb-20 flex flex-col" id="types">
                    {tabs.map((tab, index) => (
                        <div id={tab.id} key={index} className="scroll-mt-32 mb-16">
                            <div className={`transition-all duration-300 opacity-100`}>
                                <TypeSection tab={tab} fruits={SAMPLES[tab.id]} />
                            </div>
                        </div>
                    ))}
                </section>
            </div>

        </main>
    )
}

function TypeSection({ tab, fruits }) {
    return (
        <div>
            <div className="flex items-center justify-between gap-4 mb-2">
                <div className='flex items-center gap-2'>
                    <h2 className="text-4xl font-serif text-(--primary) w-fit">{tab.label}</h2>
                    <span className='text-(--primary) text-xl inline text-nowrap'>| 「 {tab.jp} 」</span>
                </div>
            </div>

            <p className="text-(--text-primary)/80 max-w-2xl leading-relaxed mb-8">{tab.desc}</p>

            <div className="flex flex-col gap-5 mb-10 border-l-2 border-(--primary)/20 pl-4">
                {tab.subtypes.map(s => (
                    <div key={s.name} className="px-5">
                        <p className="text-sm text-(--text-primary)/90 leading-relaxed">
                            <strong className="text-(--primary) uppercase tracking-widest text-[0.65rem] block mb-1">{s.name}</strong>
                            {s.desc}
                        </p>
                        <p className="text-xs text-(--text-muted) italic">e.g. {s.ex}</p>
                    </div>
                ))}
            </div>
            <h4 className='text-lg font-serif text-(--primary) mb-4'>Examples</h4>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {fruits.map(f => <FruitCard key={f.id} fruit={f} />)}
            </div>
        </div>
    )
}