import React from 'react'

export default function AkumaNoMi({ fruta }) {
    return (
        <article
            {...{ popover: '' }}
            id={String(fruta.id).toLowerCase()}
            key={fruta.id}
            style={{ "--color": 'var(--primary)', "--mix": `color-mix(in srgb, var(--color), white 50%)` }}
            className='w-full max-w-96 border border-(--primary)/30 hover:bg-(--bg-secondary)/50 backdrop-blur-sm duration-300 p-5 grow rounded-xl relative transition-colors min-h-50 [&:popover-open]:flex flex-col gap-4 items-center'>

            <div className='w-1/3 h-24 shrink-0' style={{ anchorName: `--svg-${fruta.id}`, "--size": `--svg-${fruta.id}`, "--mask": `url(/images/fruits/${fruta.localImg})` }}>
                <img src={`/images/fruits/${fruta.localImg}`}
                    draggable='false' alt={fruta.name + " | Devil Fruit Encyclopedia"} className='w-full h-full object-contain select-none filter-[drop-shadow(0_0_40px_var(--mix))]'
                />
            </div>

            <div className='flex flex-col pr-2'>
                <h3 className='font-extrabold text-xl text-(--primary) leading-none text-balance'>
                    <ruby className='ruby-base'>
                        {fruta.name}
                        <rt className='text-sm uppercase tracking-[0.2em] font-normal translate-y-1 -translate-x-2 opacity-80'>「{fruta.jpName}」</rt>
                    </ruby>
                </h3>
                <span className='text-xs leading-none text-(--primary)/70'>EN: {fruta.engName}</span>
                <p className='text-md text-(--text-primary) line-clamp-2 mt-2 leading-none'>{fruta.desc}</p>

                <span className='text-[.6rem] mt-1 uppercase text-(--primary) w-fit [&_a]:font-bold' style={{ anchorName: `--link-${fruta.id}`, "--extLnk": `--link-${fruta.id}` }}>
                    User(s): {Array.isArray(fruta.owner) ?
                        fruta.owner.map((o, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && ', '}
                                <a href={`https://onepiece.fandom.com/wiki/${o}`} target='_blank' className='hover:underline'>
                                    {o}
                                </a>
                            </React.Fragment>
                        )) :
                        <a href={`https://onepiece.fandom.com/wiki/${fruta.owner}`} target='_blank' className='hover:underline'>
                            {fruta.owner || 'desconhecido'}
                        </a>
                    }
                </span>
            </div>

            <span className='text-white text-[.65rem] uppercase w-fit tracking-tighter bg-(--primary) rounded-full px-2 absolute top-4 right-4'>{fruta.type}</span>
        </article>
    )
}