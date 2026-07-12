import React from 'react'

const HeroSecText = ({ title, caption, subText }) => {
    return (
        <div
            className="mt-14 md:mt-16 w-full bg-[#ede8e0] pt-[#64] pb-[5] flex flex-col items-center justify-center text-center px-6"
            style={{ paddingTop: "64px", paddingBottom: "56px" }}
        >
            <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-px bg-[#B8935A]" />
                    <span className="font-jost font-normal text-[#B8935A] text-[11px] tracking-[4px] uppercase">
                        {caption}
                    </span>
                    <div className="w-10 h-px bg-[#B8935A]" />
                </div>
                <h2 className="text-[clamp(32px,5vw,54px)] text-[#B8935A] font-playfair font-medium leading-tight mb-5">
                    <em >{title}</em>
                </h2>
                <p className="max-w-2xl text-[1rem] leading-relaxed" style={{ color: '#2c2420cc' }}>
                   {subText}
                </p>
            </div>

        </div>)
}

export default HeroSecText
