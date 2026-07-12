import { useEffect, useRef } from "react";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterCategories from "./FooterCategories";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  const dividerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.style.width = "100%";
      },
      { threshold: 0.3 }
    );
    if (dividerRef.current) observer.observe(dividerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative overflow-hidden text-[#e8ddd0] bg-[#0d0b08]">

      {/* Top golden line */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #d4a84b 30%, #c8883a 70%, transparent)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-10 sm:pb-14">

        {/* ══ Main Grid ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-10 sm:gap-12 mb-14">
          <FooterBrand />
          <FooterLinks />
          <FooterCategories />
          <FooterContact />
        </div>

        {/* ── Animated Divider ── */}
        <div
          ref={dividerRef}
          className="h-px mb-7 transition-[width] duration-[1200ms] ease-out"
          style={{
            width: "0%",
            background:
              "linear-gradient(90deg, transparent, rgba(212,168,75,0.4) 50%, transparent)",
          }}
        />

        <FooterBottom />
      </div>
    </footer>
  );
}
