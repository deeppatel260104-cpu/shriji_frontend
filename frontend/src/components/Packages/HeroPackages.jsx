import React from 'react'
import { Check, Info, ShieldCheck, Camera, Video, Clock, Layout, ArrowRight } from "lucide-react";

const HeroPackages = () => {
    return (
        <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 px-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h1 className="text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] mb-8 font-light italic text-dark-brown">
                    Invest in Your <em className="text-gold">Legacy</em>
                </h1>
                <p className="max-w-2xl mx-auto text-ink-light text-base sm:text-lg font-light leading-relaxed mb-10">
                    Every celebration is unique. Our packages are designed to give you peace of mind while we preserve the magic of your most cherished moments with cinematic precision.
                </p>
            </div>
        </section>
    )
}

export default HeroPackages