export default function H1Seo() {
    return (
        <div className='w-full max-w-360 mx-auto pb-12 flex flex-col gap-2 absolute [position-anchor:--section] top-[calc(anchor(bottom)+15rem)] left-[anchor(left)] z-50'>
            <h1 className="text-3xl font-bold text-[#976f47] leading-0">
                Devil Fruit Encyclopedia | 悪魔の実図鑑, Akuma no Mi Zukan
            </h1>

            <p className="mt-4 text-xl text-[#976f47]">
                Explore all Devil Fruits from One Piece, including Paramecia, Logia, and Zoan types,
                their powers, users, and appearances.
            </p>
            <span className='text-sm text-gray-700 w-full block'>
                Developed by <a href="https://github.com/brunofranciscojs/" target='_blank' className='underline font-semibold'>brunofranciscojs</a>&nbsp;
                using Next.js and Tailwind CSS, most of the info are from <a href="https://onepiece.fandom.com/wiki/One_Piece_Wiki" target='_blank' className='underline'>One Piece Wiki</a>.&nbsp; <br />
                The list is incomplete, as the manga is still ongoing, if you find any missing fruit, please let me know.
            </span>

            <img src="/amnz.webp" alt="" className='w-full h-auto' />
        </div>
    )
}