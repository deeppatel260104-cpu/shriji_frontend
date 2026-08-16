import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import shriji_logo from "../../assets/Logo/shriji_logo_black.png";
import { Phone } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Packages", href: "/packages" },
  { label: "About Us", href: "/about-us" },
  { label: "Review", href: "https://g.page/r/CTfoY19wm3NdEAE/review", external: true },
];
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close drawer on route change ── */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* ── lock body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          h-[64px] sm:h-[70px]
          flex items-center justify-between
          px-4 sm:px-8 lg:px-12
          transition-all duration-300
          bg-[#ede8e0]
          ${scrolled ? "border-b border-black/10" : "border-b border-black/5"}
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="Shriji Photography — Home">
          <img
            src={shriji_logo}
            alt="Shriji Photography"
            className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-7 list-none m-0 p-0">
          {navLinks.map((l) => (
            <li key={l.label}>
              {l.external ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                   relative text-[0.82rem] lg:text-[0.88rem]
                  font-jost font-normal uppercase tracking-wide
                  text-[#2c2420] pb-0.5
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:h-px after:bg-neutral-900 after:transition-all after:duration-300
                  hover:text-black hover:after:w-full after:w-0">
                  {l.label}
                </a>
              ) : (
                <Link
                  to={l.href}
                  className={`
                  relative text-[0.82rem] lg:text-[0.88rem]
                  font-jost font-normal uppercase tracking-wide
                  text-[#2c2420] pb-0.5
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:h-px after:bg-neutral-900 after:transition-all after:duration-300
                  hover:text-black hover:after:w-full
                  ${isActive(l.href) ? "after:w-full font-medium" : "after:w-0"}
                `}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Phone — icon only on md, full number on lg+ */}
          <a
            href="tel:+919723814145"
            className="
              flex items-center gap-1.5
              font-jost text-[0.82rem] lg:text-[0.88rem] font-medium tracking-wide
              text-neutral-800 no-underline hover:text-black
              transition-colors duration-200
            "
          >
            <Phone size={16} />
            <span className="hidden lg:inline">+91 97238 14145</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919067736321"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1.5
              font-jost text-[0.82rem] lg:text-[0.88rem] uppercase tracking-wide
              text-[#2c2420] border border-[#2c2420]
              px-3 lg:px-5 py-2 lg:py-2.5
              no-underline transition-all duration-200
              hover:bg-[#2c2420] hover:text-white
              whitespace-nowrap
            "
          >
            <WhatsAppIcon />
            {/* Label hidden on md to save space, visible on lg+ */}
            <span className="hidden lg:inline">WhatsApp</span>
          </a>

          {/* Contact Us */}
          <Link
            to="/contact"
            className="
              font-jost text-[0.82rem] lg:text-[0.88rem] uppercase tracking-wide
              text-[#2c2420] border border-[#2c2420]
              px-3 lg:px-5 py-2 lg:py-2.5
              no-underline transition-all duration-200
              hover:bg-[#2c2420] hover:text-white
              whitespace-nowrap
            "
          >
            Contact Us
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="flex md:hidden flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-2 -mr-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-[22px] h-[1.5px] bg-neutral-900 transition-all duration-300 origin-center ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-neutral-900 transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`} />
          <span className={`block w-[22px] h-[1.5px] bg-neutral-900 transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 z-30 md:hidden
          bg-black/20 backdrop-blur-sm
          transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed top-[64px] sm:top-[70px] left-0 right-0 z-40
          md:hidden bg-[#ede8e0] border-t border-black/8
          transition-all duration-300 ease-in-out
          ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}
        `}
      >
        <div className="px-5 sm:px-8 pt-4 pb-6">
          {/* Nav Links */}
          <nav aria-label="Mobile navigation">
            {navLinks.map((l) => {
              const className = `
                  flex items-center
                  text-[0.95rem] font-jost
                  no-underline py-3.5
                  border-b border-black/6 last:border-b-0
                  transition-colors duration-200
                 ${!l.external && isActive(l.href) ? "text-neutral-900 font-medium" : "text-[#2c2420] hover:text-black"} `;
              if (l.external) {
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className={className}
                  >{l.label}</a>
                );
              }
              return (
                <Link
                  key={l.label}
                    href={l.href}                  
                    onClick={() => setMenuOpen(false)}
                    className={className}>
                {l.label}
                {isActive(l.href) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2c2420]" />
                )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile CTAs — stacked on xs, row on sm */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Phone */}
            <a
              href="tel:+919723814145"
              className="
                flex items-center justify-center gap-2
                font-jost text-[0.88rem] font-medium tracking-wide
                text-neutral-800 no-underline
                border border-neutral-300 py-3 px-4
                hover:border-neutral-700 transition-colors duration-200
              "
            >
              <Phone size={16} />
              +91 97238 14145
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919067736321"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2
                font-jost text-[0.88rem] uppercase tracking-wide
                text-[#2c2420] border border-[#2c2420]
                py-3 px-4
                no-underline transition-all duration-200
                hover:bg-[#2c2420] hover:text-white
              "
            >
              <WhatsAppIcon />
              WhatsApp
            </a>

            {/* Contact Us */}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="
                flex items-center justify-center gap-2
                font-jost uppercase text-[0.88rem] font-medium tracking-wide
                text-neutral-800 no-underline
                border border-neutral-300 py-3 px-4
                hover:border-neutral-700 transition-colors duration-200
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Inline phone icon to avoid extra imports ── */
