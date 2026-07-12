import { useEffect, useRef, useState } from "react";
import PHOTOGRAPHER_IMG from "../../assets/photographer.png"

// Animated letter component for name reveal
const AnimatedName = ({ name, subtitle }) => {
  const letters = name.split("");

  return (
    <div className="text-right select-none">
      <div className="flex justify-end flex-wrap leading-none gap-x-1 sm:gap-x-2">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="font-cinzel text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-transparent [-webkit-text-stroke:1px_rgba(26,26,26,0.13)] tracking-tight sm:tracking-wider opacity-0 translate-y-10 scale-90 animate-letter-reveal"
            style={{ animationDelay: `${0.8 + i * 0.06}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div
        className="font-jost text-[9px] sm:text-[11px] font-light tracking-[4px] sm:tracking-[6px] uppercase text-gold mt-1 opacity-0 animate-[fadeUp_0.8s_ease_forwards]"
        style={{ animationDelay: `${0.8 + letters.length * 0.06 + 0.2}s` }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export default function AboutUs() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full grid grid-cols-1 md:grid-cols-2 bg-cream font-jost"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 noise-overlay" />

      {/* Vertical divider line (Desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-[10%] h-[80%] w-px bg-linear-to-b from-transparent via-gold to-transparent opacity-30 z-20" />

      {/* ── LEFT PANEL ── */}
      <div className="relative z-30 flex flex-col justify-center px-6 py-16 sm:px-12 md:pl-20 md:pr-12 lg:pl-28 lg:pr-16 order-2 md:order-1">
        {/* Teal Accent Bar (Desktop only) */}

        <h2 className={`font-serif text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-snug lg:leading-[1.15] text-ink mb-6 sm:mb-8 transition-all duration-900 delay-400 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Crafting <em className="italic text-gold">timeless</em><br />
          stories, one frame<br />
          at a time.
        </h2>

        <div className={`h-[1px] bg-linear-to-r from-gold to-transparent mb-6 sm:mb-8 transition-all duration-1200 delay-600 ease-out ${visible ? "w-[100px] sm:w-[120px]" : "w-0"}`} />

        <p className={`font-jost text-[14px] sm:text-[14.5px] font-light leading-[1.8] sm:leading-[1.9] text-ink-light max-w-[460px] transition-all duration-900 delay-[650ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
         Since 1997, Shriji Studio has been capturing beautiful memories with creativity, emotion, and dedication. Over the years, we have proudly served countless families and couples, turning special moments into timeless photographs.
          <br /><br />
          With years of experience in wedding photography, pre-wedding shoots, and event coverage, Shriji Studio is known for delivering natural, elegant, and memorable photography that reflects real emotions and celebrations.
          <br /><br />
      Our passion is simple — to capture your precious moments beautifully and preserve them for a lifetime.
      
        </p>

        {/* Stats Row - Responsive Grid */}

      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="relative z-30 flex items-end justify-center min-h-[400px] sm:min-h-[500px] md:min-h-0 order-1 md:order-2 overflow-hidden md:overflow-visible">
        {/* Decorative Circle 1 */}
        <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] -top-10 -right-10 md:top-[8%] md:-right-[60px] rounded-full border border-gold/15 z-20" />

        {/* Decorative Circle 2 (Desktop focused) */}
        <div className="hidden lg:block absolute w-[180px] h-[180px] top-[22%] right-[28px] rounded-full border border-dashed border-gold/15 z-20 opacity-40 animate-[spin_20s_linear_infinite_reverse]" />

        {/* Warm glow behind photo */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-[radial-gradient(ellipse_at_50%_85%,rgba(184,149,90,0.12)_0%,transparent_65%)] z-30 pointer-events-none" />

        {/* Photographer image */}
        <img
          src={PHOTOGRAPHER_IMG}
          alt="Photographer"
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] md:h-[92%] w-auto max-w-[95%] object-contain object-bottom transition-all duration-1100 delay-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] grayscale-[15%] contrast-[1.05] z-40 [mask-image:linear-gradient(to_top,transparent_0%,black_15%,black_100%)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        />

        {/* Corner ornament (Desktop only) */}
        <div className="hidden md:block absolute top-10 right-10 w-12 h-12 lg:w-16 lg:h-16 border-t border-r border-gold/25 z-50 pointer-events-none" />

        {/* Floating tag */}
        <div className={`absolute top-6 left-6 md:top-14 md:left-12 bg-ink text-cream font-jost text-[8px] sm:text-[9px] font-light tracking-[2px] sm:tracking-[3px] uppercase px-3 py-1.5 md:px-4 md:py-2 transition-all duration-700 delay-1100 z-50 flex items-center shadow-xl ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <span className="w-1.5 h-1.5 bg-teal rounded-full mr-2 animate-pulse" />
          Est. 1997 · India
        </div>

        {/* Large animated studio name */}
        <div className="absolute bottom-0 right-0 w-full px-4 py-6 sm:px-8 sm:py-8 md:px-10 flex flex-col items-end z-50 pointer-events-none">
          {visible && (
            <AnimatedName name="SHRIJI" subtitle="Artistic Photography" />
          )}
        </div>
      </div>
    </section>
  );
}