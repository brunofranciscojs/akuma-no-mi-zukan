export default function Pagination({ paginas, pagina, updateParams, isPending, setFruitsPerPage, setPagina, anchor }) {
    return (
        <ol className={`[grid-area:pagination] py-px px-px cl:w-fit w-full mx-auto pagination [&::-webkit-scrollbar]:w-0 items-center justify-start xl:justify-end flex gap-2 overflow-x-scroll text-(--text-primary) transition-opacity ${isPending ? 'opacity-50' : ''} [&:has(.active)_.active]:bg-(--primary-dark)  [&:has(.active)_.active]:text-white scroll-smooth`}>
            {paginas.length > 1 && paginas.map(number => {
                return (
                    <button type='button'
                        key={number}
                        onClick={() => updateParams({ page: number })}
                        className={pagina === number ? "active px-2 rounded-sm bg-(--primary)! text-white!" : "px-2 rounded-sm text-(--primary) hover:text-white! dark:hover:bg-(--primary-dark) hover:bg-(--primary)! cursor-pointer"}
                    >
                        {number}
                    </button>
                )
            })}
            <div className='flex [grid-area:fruitsperpage] items-center flex-col gap-2 [anchor-name:var(--anchor)]
                        after:content-["Per_Page:"] justify-center xl:justify-start
                        after:absolute after:[position-anchor:var(--anchor)] after:top-[calc(anchor(top)-1.2rem)] 
                        after:left-[calc(anchor(left)+.1rem)] after:text-(--primary) after:text-xs -order-1 cl:order-[unset]'
                style={{ '--anchor': `--${anchor}` }}>

                <select id="fruits-per-page" onChange={(e) => setFruitsPerPage(e.target.value > 50 ? (setPagina(1), e.target.value) : e.target.value)}
                    className=' outline-(--primary) outline-1 rounded-sm px-2'>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="1000">All</option>
                </select>
            </div>
        </ol>
    )
}