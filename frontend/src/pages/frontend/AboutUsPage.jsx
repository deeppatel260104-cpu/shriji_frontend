// import { useEffect, useRef, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import shriji_logo from "../../assets/Logo/shriji_logo_black.png";
// import PHOTOGRAPHER_IMG from "../../assets/photographer.png";
// import Footer from './../../components/Footer/Footer';

// // Intersection Observer Hook for animations
// const useIntersection = (threshold = 0.1) => {
//   const [isIntersecting, setIntersecting] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIntersecting(true);
//         observer.unobserve(entry.target);
//       }
//     }, { threshold });

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [threshold]);

//   return [ref, isIntersecting];
// };

// const AnimatedText = ({ text, className, delay = 0 }) => {
//   const [ref, isVisible] = useIntersection();
//   return (
//     <div ref={ref} className={`overflow-hidden ${className}`}>
//       <div 
//         className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}
//         style={{ transitionDelay: `${delay}s` }}
//       >
//         {text}
//       </div>
//     </div>
//   );
// };

// export default function AboutUs() {
//   const [scrollY, setScrollY] = useState(0);
//   const [heroRef, heroVisible] = useIntersection(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     window.scrollTo(0, 0);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="bg-cream text-ink font-jost overflow-x-hidden">
//       <Navbar />

//       {/* ── HERO SECTION ── */}
//       <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Parallax Image */}
//         <div 
//           className="absolute inset-0 z-0 scale-110"
//           style={{ 
//             transform: `translateY(${scrollY * 0.3}px)`,
//             backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center'
//           }}
//         >
//           <div className="absolute inset-0 bg-ink/50 backdrop-blur-[1px]" />
//         </div>

//         <div className="relative z-10 text-center px-6">
//           <p className={`font-jost text-cream/70 text-[10px] sm:text-xs tracking-[8px] sm:tracking-[12px] uppercase mb-6 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//             Since 1998 • Shriji Studio
//           </p>
//           <h1 className="font-jost text-cream text-[clamp(3.5rem,15vw,10rem)] leading-[0.85] mb-10 tracking-tighter">
//             <AnimatedText text="Timeless" delay={0.5} />
//             <AnimatedText text="Elegance" delay={0.7} />
//           </h1>
//           <div className={`w-px h-16 sm:h-24 bg-linear-to-b from-gold to-transparent mx-auto transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-50 scale-y-100' : 'opacity-0 scale-y-0'} animate-bounce`} />
//         </div>

//         {/* Vertical Text Ornament */}
//         <div className="absolute right-12 bottom-24 hidden lg:block opacity-30">
//           <p className="font-jost text-cream text-[9px] tracking-[6px] uppercase vertical-text">
//             Capturing the essence of soul
//           </p>
//         </div>
//       </section>

//       {/* ── PHILOSOPHY SECTION ── */}
//       <section className="py-24 sm:py-32 lg:py-48 px-6 sm:px-12 lg:px-24">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
//           <div className="w-full lg:w-1/2 relative group">
//             <div className={`noise-overlay absolute inset-0 z-10 rounded-2xl`} />
//             <div className="relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
//                 <img 
//                 src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" 
//                 alt="Artistic Photography" 
//                 className="w-full h-full object-cover grayscale brightness-90 transition-transform duration-1000 group-hover:scale-110"
//                 />
//             </div>

//             {/* Rotating Badge */}
//             <div className="absolute -bottom-8 -right-8 w-32 h-32 sm:w-44 sm:h-44 bg-gold rounded-full flex items-center justify-center p-6 text-center animate-[spin_25s_linear_infinite] z-20 shadow-2xl">
//                 <p className="font-jost text-cream text-[8px] sm:text-[10px] tracking-widest leading-tight uppercase font-bold">
//                     Pure Emotion · Timeless Frame · Artistic Vision
//                 </p>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2">
//             <div className="mb-8">
//                 <span className="inline-block w-8 h-px bg-gold mr-4 align-middle" />
//                 <span className="font-jost text-gold text-[10px] sm:text-xs tracking-[5px] uppercase">The Vision</span>
//             </div>
//             <h2 className="font-serif text-ink text-[clamp(2.5rem,6vw,4.5rem)] font-light mb-10 leading-[1.05] tracking-tight">
//               Capturing light, <br />
//               preserving <em className="text-gold italic underline decoration-gold/30 underline-offset-8">dreams</em>.
//             </h2>
//             <div className="space-y-8 text-ink-light text-lg font-light leading-relaxed max-w-xl">
//               <p>
//                 We believe that photography is not just about pressing a shutter; it's about seeing the beauty in the mundane and the extraordinary in the quiet moments.
//               </p>
//               <p>
//                 For over 25 years, Shriji Studio has been the silent witness to thousands of love stories, translating raw emotions into artistic legacies that bridge generations.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 pt-12 border-t border-ink/5">
//                 {[
//                     { icon: <Heart size={20} />, title: "Emotional depth", sub: "We feel before we click" },
//                     { icon: <ShieldCheck size={20} />, title: "Trusted legacy", sub: "25+ years of excellence" },
//                     { icon: <Sparkles size={20} />, title: "Artistic flair", sub: "Bespoke visual style" },
//                     { icon: <Globe size={20} />, title: "Global reach", sub: "Available worldwide" }
//                 ].map((item, i) => (
//                     <div key={i} className="flex gap-4 group cursor-default">
//                         <div className="w-12 h-12 rounded-xs border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream transition-colors duration-500 shrink-0">
//                             {item.icon}
//                         </div>
//                         <div>
//                             <h4 className="font-serif text-lg text-ink mb-1">{item.title}</h4>
//                             <p className="text-xs text-ink/50 uppercase tracking-widest">{item.sub}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── QUOTE SECTION ── */}
//       <section className="bg-ink py-25 text-center px-6 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10 pointer-events-none">
//             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(184,147,90,0.15)_0%,transparent_70%)]" />
//         </div>
//         <div className="max-w-4xl mx-auto relative z-10">
//             <Sparkles className="text-gold/40 mx-auto mb-8 animate-pulse" size={40} />
//             <h3 className="font-playfair text-cream text-[clamp(1.75rem,5vw,3rem)] font-light leading-relaxed italic">
//                 "Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever… It remembers little things, long after you have forgotten everything."
//             </h3>
//             <div className="mt-12">
//                 <span className="font-jost text-gold text-xs tracking-[8px] uppercase">— Aaron Siskind</span>
//             </div>
//         </div>
//       </section>

//       {/* ── THE FOUNDER ── */}
//       <section className="py-24 sm:py-32 lg:py-48 bg-cream relative">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="flex flex-col lg:flex-row-reverse items-center gap-20 lg:gap-32">
//             <div className="w-full lg:w-1/2 flex justify-center perspective-1000">
//               <div className="relative group w-full max-w-lg transition-transform duration-700 hover:rotate-y-6">
//                 <div className="absolute -inset-4 border border-gold/20 rounded-2xl group-hover:inset-0 transition-all duration-700" />
//                 <img 
//                   src={PHOTOGRAPHER_IMG} 
//                   alt="Kamlesh Shah" 
//                   className="relative z-10 w-full h-auto rounded-xl grayscale contrast-[1.1] shadow-2xl"
//                 />
//                 <div className="absolute -bottom-8 -left-8 bg-ink p-8 sm:p-12 text-cream z-20 shadow-[20px_20px_60px_rgba(0,0,0,0.3)]">
//                   <p className="font-serif text-3xl sm:text-4xl mb-2 text-gold">Kamlesh Shah</p>
//                   <p className="font-jost text-[10px] sm:text-[11px] tracking-[4px] uppercase text-cream/60">Creative Director & Founder</p>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full lg:w-1/2">
//               <p className="font-jost text-teal text-[11px] tracking-[6px] uppercase mb-8">The Mastermind</p>
//               <h3 className="font-serif text-ink text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-12">The heart beat of <br />Shriji Studio.</h3>
//               <div className="space-y-8 text-ink-light text-lg font-light leading-relaxed max-w-xl">
//                 <p className="border-l-4 border-gold/30 pl-8 italic text-ink/80 py-2">
//                   "I don't just take pictures. I document souls, I freeze time, and I tell the stories that words often fail to convey."
//                 </p>
//                 <p>
//                   Launched in 1998, Kamlesh Shah's vision was simple: bring a cinematic perspective to Indian weddings without losing the raw, traditional essence that makes them sacred.
//                 </p>
//                 <p>
//                   Today, he leads a team of passionate storytellers, traveling across 18 countries to ensure that every Shriji client receives a masterpiece of their own history.
//                 </p>
//                 <div className="pt-12 flex items-center gap-8">
//                   <img src={shriji_logo} alt="Shriji Logo" className="h-12 w-auto opacity-20 grayscale grayscale-100" />
//                   <div className="flex-1 h-px bg-ink/10" />
//                   <div className="flex gap-4">
//                     {[1, 2, 3].map(i => (
//                         <div key={i} className="w-2 h-2 rounded-full bg-gold/30" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FINAL CTA ── */}
//       <section className="pb-32 pt-12 text-center">
//         <div className="max-w-2xl mx-auto px-6">
//             <h4 className="font-serif text-ink text-3xl mb-8">Ready to tell your story?</h4>
//             <a 
//                 href="/contact" 
//                 className="inline-block px-12 py-5 bg-ink text-cream font-jost text-xs uppercase tracking-[4px] transition-all duration-500 hover:tracking-[6px] hover:bg-gold shadow-xl"
//             >
//                 Get in touch
//             </a>
//         </div>
//       </section>

//       <Footer />

//       <style>{`
//         .vertical-text {
//           writing-mode: vertical-rl;
//           text-orientation: mixed;
//           transform: rotate(180deg);
//         }

//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(100%); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .noise-overlay {
//             pointer-events: none;
//             background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
//         }

//         .perspective-1000 {
//             perspective: 1000px;
//         }

//         .rotate-y-6 {
//             transform: rotateY(6deg);
//         }
//       `}</style>
//     </div>
//   );
// }

import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import HeroSection from '../../components/AboutUs/AboutUsSlogan';
import AboutUs from '../../components/HomePage/AboutUs';
import AboutUsSlogan from './../../components/AboutUs/AboutUsSlogan';
import HeroSecText from '../../components/helper/HeroSecText';
import ImageText from './../../components/helper/ImageText';

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <HeroSecText title="Our Story" caption="About Us" />
      <AboutUs />
      <AboutUsSlogan />
      <ImageText />

      <Footer />
    </>
  )
}

export default AboutUsPage