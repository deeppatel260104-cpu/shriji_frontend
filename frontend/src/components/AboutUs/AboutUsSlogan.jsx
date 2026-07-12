import React from 'react'
import { Camera, Heart, Globe, Award, Zap, Users, ShieldCheck, Sparkles } from "lucide-react";

const AboutUsSlogan = () => {
    return (
    <section className="bg-ink py-25 text-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(184,147,90,0.15)_0%,transparent_70%)]" />
         </div>
         <div className="max-w-4xl mx-auto relative z-10">
             <Sparkles className="text-gold/40 mx-auto mb-8 animate-pulse" size={40} />
             <h3 className="font-playfair text-cream text-[clamp(1.75rem,5vw,3rem)] font-light leading-relaxed italic">
                 "Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever… It remembers little things, long after you have forgotten everything."
             </h3>
             <div className="mt-12">
                 <span className="font-jost text-gold text-xs tracking-[8px] uppercase">— Aaron Siskind</span>
             </div>
         </div>
       </section>

       
    )
}

export default AboutUsSlogan