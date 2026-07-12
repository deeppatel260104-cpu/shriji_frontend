const SocialIcon = ({ label, path, href = "#" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      w-11 h-11 flex items-center justify-center rounded-sm
      border border-[rgba(212,168,75,0.4)] text-[#d4c9b8]
      transition-all duration-300 cursor-pointer
      hover:border-[#d4a84b] hover:text-[#d4a84b] hover:bg-[rgba(212,168,75,0.08)]
    "
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  </a>
);

export default SocialIcon;
