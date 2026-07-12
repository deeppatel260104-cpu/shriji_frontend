import shriji_logo from "../../assets/Logo/shriji_logo_black.png";
import SocialIcon from "./SocialIcon";

const FooterBrand = () => (
  <div className="sm:col-span-2 lg:col-span-1">
    {/* Logo */}
    <div className="mb-5">
      <img
        src={shriji_logo}
        alt="Shriji Studio"
        className="h-16 object-contain opacity-90"
        style={{ filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)" }}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "block";
        }}
      />
      {/* Fallback */}
      <div style={{ display: "none" }}>
        <span
          className="text-[#f0e8dc] text-3xl tracking-[0.12em]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Shreeji{" "}
        </span>
        <span
          className="text-[#d4a84b] text-3xl italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Studio
        </span>
      </div>
    </div>

    {/* Quote */}
    <p className="font-playfair text-[#d4c9b8] text-[1.1rem] leading-[1.85] italic mb-7 max-w-xs border-l-2 border-[#B8935A] pl-3.5">
      "Every frame tells a story — we make sure yours is told beautifully."
    </p>

    {/* Social icons */}
    <div className="flex gap-2.5 flex-wrap">
      <SocialIcon
        label="WhatsApp"
        href="https://wa.me/919067736321"
        path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.998 2C6.477 2 2 6.484 2 12.017c0 1.990.523 3.848 1.437 5.457L2 22l4.641-1.418A10.014 10.014 0 0 0 12 22c5.522 0 10-4.482 10-10.002S17.52 2 11.998 2z"
      />
      <SocialIcon
        label="Instagram"
        href="#"
        path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z"
      />
      <SocialIcon
        label="YouTube"
        href="https://www.youtube.com/@shrijiphotostudio"
        path="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L15.5 12l-5.75 3.02z"
      />
       <SocialIcon
              label="Google Maps"
              href="https://maps.app.goo.gl/Zo59bFQ5vkoQVzUq7"
              path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
      <SocialIcon
        label="Pinterest"
        href="https://in.pinterest.com/shrijistudio99"
        path="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .89-.57 2.24-.87 3.48-.25 1.04.51 1.88 1.53 1.88 1.84 0 3.07-2.35 3.07-5.13 0-2.12-1.44-3.71-4.03-3.71-2.93 0-4.76 2.19-4.76 4.64 0 .84.24 1.43.62 1.89.17.2.19.28.13.51-.04.17-.14.58-.18.74-.06.24-.24.32-.44.24-1.23-.5-1.81-1.86-1.81-3.38 0-2.51 2.12-5.52 6.32-5.52 3.39 0 5.63 2.46 5.63 5.1 0 3.51-1.94 6.13-4.8 6.13-.96 0-1.86-.52-2.17-1.1l-.59 2.27c-.22.84-.81 1.88-1.2 2.52.9.28 1.85.43 2.84.43 5.52 0 10-4.48 10-10S17.52 2 12 2z"
      />
      
    </div>
  </div>
);

export default FooterBrand;
