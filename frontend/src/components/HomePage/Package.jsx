import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPackages } from "../../actions/packageAction";

const fallbackPackages = [
  {
    id: "basic",
    tier: "Basic",
    price: "24,999",
    tagline: "All-inclusive · No hidden charges",
    highlight: false,
    badge: null,
    features: [
      "4 Hours of Coverage",
      "150 Edited Photos",
      "1 Location",
      "Online Gallery Access",
      "30-Second Reel",
      "Digital Delivery in 7 Days",
    ],
    accent: "#B8935A",
    cta: "Book Basic",
  },
  {
    id: "standard",
    tier: "Standard",
    price: "49,999",
    tagline: "Best value · Most chosen",
    highlight: true,
    badge: "MOST POPULAR",
    features: [
      "8 Hours of Coverage",
      "350 Edited Photos",
      "2 Locations",
      "Cinematic Highlight Reel",
      "Printed 20×30 Canvas",
      "Premium Photo Album",
      "Priority Editing (5 Days)",
    ],
    accent: "#B8935A",
    cta: "Book Standard",
  },
  {
    id: "premium",
    tier: "Premium",
    price: "89,999",
    tagline: "Full experience · White glove",
    highlight: false,
    badge: null,
    features: [
      "Full Day Coverage (12 hrs)",
      "600+ Edited Photos",
      "Unlimited Locations",
      "Full Wedding Film (10–15 min)",
      "Drone Photography",
      "Luxury Hardbound Album",
      "2 Photographers + Videographer",
    ],
    accent: "#B8935A",
    cta: "Book Premium",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function PackageCard({ pkg, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const features = Array.isArray(pkg.features)
    ? pkg.features
    : String(pkg.features || '').split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col w-full sm:max-w-sm overflow-hidden cursor-default"
      style={{
        borderRadius: 0,
        background: pkg.highlight
          ? "linear-gradient(160deg, #2c2420 0%, #1a1410 100%)"
          : "rgba(247,243,238,0.022)",
        border: pkg.highlight
          ? "1px solid rgba(184,147,90,0.55)"
          : "1px solid rgba(247,243,238,0.07)",
        boxShadow: pkg.highlight
          ? hovered
            ? "0 32px 80px rgba(184,147,90,0.22), 0 0 0 1px rgba(184,147,90,0.4)"
            : "0 16px 60px rgba(184,147,90,0.12)"
          : hovered
            ? "0 24px 60px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-10px)" : "translateY(0)"
          : "translateY(40px)",
        transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, opacity 0.7s ease",
        transitionDelay: inView ? `${index * 0.12}s` : "0s",
      }}
    >
      {/* Glow top edge */}
      {pkg.highlight && (
        <div
          className="absolute top-0 h-px"
          style={{
            left: "20%", right: "20%",
            background: "linear-gradient(90deg, transparent, #B8935A, transparent)",
          }}
        />
      )}

      {/* Badge */}
      {pkg.badge && (
        <div
          className="font-jost absolute top-0 left-1/2 -translate-x-1/2 font-bold text-[0.6rem] tracking-[0.25em] uppercase px-5 py-1.5 whitespace-nowrap"
          style={{
            borderRadius: 0,
            background: "#B8935A",
            color: "#2c2420",
          }}
        >
          {pkg.badge}
        </div>
      )}

      {/* Card body */}
      <div
        className="flex flex-col flex-1 px-8 sm:px-10 pb-10"
        style={{ paddingTop: pkg.badge ? "3rem" : "2.5rem" }}
      >
        {/* Tier */}
        <p
          className="font-jost text-[0.68rem] tracking-[0.3em] uppercase mb-3"
          style={{ color: "#B8935A" }}
        >
          {pkg.tier}
        </p>

        {/* Price */}
        <div
          className="font-playfair text-7xl leading-none mb-2"
          style={{ color: "#f7f3ee" }}
        >
          <span
            className="text-xl align-super mr-0.5"
            style={{ color: "#B8935A" }}
          >
            ₹
          </span>
          {pkg.price}
        </div>

        {/* Tagline */}
        <p
          className="text-[0.85rem] italic mb-7 tracking-[0.03em]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(247,243,238,0.4)",
          }}
        >
          {pkg.tagline}
        </p>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background: "linear-gradient(90deg, rgba(184,147,90,0.4), transparent)",
          }}
        />

        {/* Features */}
        <ul className="flex-1 list-none p-0 m-0 flex flex-col gap-3.5 mb-8">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex font-jost items-start gap-3 text-[0.95rem] tracking-[0.01em]"
              style={{ color: "#f7f3ee" }}
            >
              <span
                className="text-[0.7rem] mt-1 shrink-0"
                style={{ color: "#B8935A" }}
              >
                ◆
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="font-jost font-medium w-full py-4 text-[0.75rem] tracking-[0.28em] uppercase transition-all duration-300 mt-auto"
          style={{
            display: "block",
            borderRadius: 0,
            background: pkg.highlight ? "#B8935A" : "transparent",
            color: pkg.highlight ? "#2c2420" : "#B8935A",
            border: `1px solid #B8935A`,
            textAlign: "center",
            textDecoration: "none",
          }}
          onMouseEnter={e => {
            if (!pkg.highlight) {
              e.currentTarget.style.background = "rgba(184,147,90,0.1)";
            } else {
              e.currentTarget.style.background = "#c8a97e";
            }
          }}
          onMouseLeave={e => {
            if (!pkg.highlight) {
              e.currentTarget.style.background = "transparent";
            } else {
              e.currentTarget.style.background = "#B8935A";
            }
          }}
        >
          {pkg.cta || `Book ${pkg.tier}`}
        </Link>
      </div>
    </div>
  );
}

export default function Packages() {
  const [titleRef, titleInView] = useInView(0.2);
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packagesReducer);
  const packageCards = packages || fallbackPackages;

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  return (
    <section
      id="packages"
      className="relative overflow-hidden px-4 sm:px-8 py-24 sm:py-28 lg:py-36"
      style={{ background: "#0d0b08" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/5 left-1/2 -translate-x-1/2 w-[600px] lg:w-[800px] h-[400px] lg:h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(184,147,90,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16" ref={titleRef}>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-px" style={{ background: "#B8935A" }} />
          <span
            className="font-jost font-normal text-[11px] tracking-[4px] uppercase"
            style={{ color: "#B8935A" }}
          >
            Pricing
          </span>
          <div className="w-10 h-px" style={{ background: "#B8935A" }} />
        </div>
        <h2
          className="text-[clamp(32px,5vw,54px)] font-playfair font-medium leading-tight m-0"
          style={{ color: "#f7f3ee" }}
        >
          <em style={{ color: "#B8935A" }}>Our Packages</em>
        </h2>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 max-w-sm sm:max-w-md lg:max-w-6xl mx-auto items-stretch">
        {packageCards.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  );
}
