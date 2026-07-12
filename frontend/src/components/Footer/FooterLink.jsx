const FooterLink = ({ children, href = "#" }) => (
  <a
    href={href}
    className="block font-jost py-1.5 text-[#d4c9b8] no-underline text-[1.05rem] tracking-[0.04em] transition-all duration-300 hover:text-[#d4a84b] hover:tracking-[0.08em]"
  >
    {children}
  </a>
);

export default FooterLink;
