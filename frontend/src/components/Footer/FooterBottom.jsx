const FooterBottom = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <p className="font-jost text-[#B8935A] text-[0.9rem] sm:text-[0.95rem] tracking-[0.06em] m-0 text-center sm:text-left">
      © 2026 Shriji Studio. All rights reserved.
    </p>

    {/* Ornament — hidden on very small screens */}
    <div className="hidden sm:flex items-center gap-2.5">
      <div className="w-8 h-px bg-[rgba(212,168,75,0.3)]" />
      <span className="text-[#d4a84b] text-lg opacity-70">✦</span>
      <div className="w-8 h-px bg-[rgba(212,168,75,0.3)]" />
    </div>

    <p className="font-jost text-[#B8935A] text-[0.9rem] sm:text-[0.95rem] tracking-[0.06em] m-0 text-center sm:text-right">
      Designed & Developed by Scalespot Data Solution
    </p>
  </div>
);

export default FooterBottom;
