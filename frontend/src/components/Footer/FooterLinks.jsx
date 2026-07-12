import SectionHeading from "./SectionHeading";
import FooterLink from "./FooterLink";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Packages", href: "/packages" },
  { label: "About Us", href: "/about-us" },
  { label: "Review", href: "https://g.page/r/CTfoY19wm3NdEAE/review" },
];

const FooterLinks = () => (
  <div>
    <SectionHeading>Quick Links</SectionHeading>
    <div className="flex flex-col gap-0.5">
      {footerLinks.map((link, index) => (
        <FooterLink key={index} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </div>
  </div>
);

export default FooterLinks;
