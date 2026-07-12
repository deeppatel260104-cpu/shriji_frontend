import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";

const FooterContact = () => (
  <div>
    <SectionHeading>Get In Touch</SectionHeading>
    <div className="flex flex-col gap-4">
      {/* Address */}
      <div className="flex gap-3 items-start">
        <span className="text-xl mt-1 text-[#B8935A]">
          <MapPin />
        </span>
        <p className="font-jost text-[#d4c9b8] text-[1rem] leading-[1.7] m-0">
          D - 21 Shriji Photo Studio, Opp. Vinayak gold show room Vasant vihar char
          rasta, Nava Naroda, Ahmedabad, Gujarat 382330
        </p>
      </div>

      {/* Phone */}
      <div className="flex gap-3 items-center">
        <span className="text-xl text-[#B8935A]">
          <Phone />
        </span>
        <a
          href="tel:+919723814145"
          className="font-jost text-[#d4c9b8] text-[1rem] no-underline transition-colors duration-300 hover:text-[#d4a84b]"
        >
          +91 97238 14145
        </a>
      </div>

      {/* Email */}
      <div className="flex gap-3 items-center">
        <span className="text-xl text-[#B8935A]">
          <Mail />
        </span>
        <a
          href="mailto:shrijistudio99@gmail.com"
          className="font-jost text-[#d4c9b8] text-[1rem] no-underline transition-colors duration-300 hover:text-[#d4a84b]"
        >
          shrijistudio99@gmail.com
        </a>
      </div>

      {/* Hours */}
      <div className="border-t border-[#2c2420] pt-3.5 mt-1">
        <p className="font-jost text-[#d4c9b8] text-[1rem] leading-[1.8] m-0">
          Mon — Sun: 9:30am — 9:00pm
          <br />
          Lunch Break: 2:00pm — 3:00pm
        </p>
      </div>
    </div>
  </div>
);

export default FooterContact;
