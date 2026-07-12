import { useEffect, useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@300;400&display=swap');

  @keyframes spin {
    from { stroke-dashoffset: 220; transform: rotate(-90deg); }
    to   { stroke-dashoffset: -220; transform: rotate(270deg); }
  }

  @keyframes fadeScaleIn {
    0%   { opacity: 0; transform: scale(0.88); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes fadeUp {
    0%   { opacity: 0; transform: translateY(18px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.55; }
    50%       { opacity: 1; }
  }

  @keyframes dotPulse {
    0%, 80%, 100% { opacity: 0.2; transform: scaleY(0.6); }
    40%           { opacity: 1;   transform: scaleY(1); }
  }

  .font-cinzel { font-family: 'Cinzel', serif; }
  .font-cormorant { font-family: 'Cormorant Garamond', serif; }

  .camera-wrap {
    animation: fadeScaleIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
  }

  .studio-name {
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both;
  }

  .studio-tagline {
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both;
  }

  .divider-line {
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
  }

  .loading-dots {
    animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both;
  }

  .loader-arc {
    transform-origin: center;
    animation: spin 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .shimmer-ring {
    animation: shimmer 3.2s ease-in-out infinite;
  }

  .dot {
    display: inline-block;
    width: 3px;
    height: 12px;
    border-radius: 2px;
    background: #d4c5a9;
    margin: 0 3px;
  }

  .dot:nth-child(1) { animation: dotPulse 1.4s ease-in-out 0s infinite; }
  .dot:nth-child(2) { animation: dotPulse 1.4s ease-in-out 0.2s infinite; }
  .dot:nth-child(3) { animation: dotPulse 1.4s ease-in-out 0.4s infinite; }
`;

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cx = 60, cy = 57, r = 17;
  const circumference = 2 * Math.PI * r;

  return (
    <>
      <style>{style}</style>

      {/* Root container */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f7f3ee] font-cormorant">

        {/* Vignette overlay */}
        {/* <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        /> */}

        {/* Grain texture overlay */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center px-6">

          {/* Camera SVG */}
          <div className="camera-wrap mb-9">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Camera body */}
              <rect x="8" y="22" width="104" height="68" rx="8" ry="8"
                stroke="#2c2420 " strokeWidth="1.5" fill="none" opacity="0.75" />

              {/* Viewfinder bump */}
              <path d="M40 22 L40 13 Q40 8 45 8 L75 8 Q80 8 80 13 L80 22"
                stroke="#2c2420 " strokeWidth="1.5" fill="none" opacity="0.75" />

              {/* Flash dot */}
              <circle cx="98" cy="35" r="4" fill="#2c2420 " opacity="0.4" />

              {/* Lens outer ring */}
              <circle cx={cx} cy={cy} r="26" stroke="#0d0b08" strokeWidth="0.8" opacity="0.3" />

              {/* Lens middle ring */}
              <circle cx={cx} cy={cy} r="22" stroke="#0d0b08" strokeWidth="0.6" opacity="0.2" />

              {/* Lens fill (dark glass) */}
              <circle cx={cx} cy={cy} r="19" fill="#0d0b08" />

              {/* Shimmer static ring */}
              <circle
                className="shimmer-ring"
                cx={cx} cy={cy} r={r}
                stroke="#0d0b08" strokeWidth="1.2" fill="none" opacity="0.3"
              />

              {/* Rotating arc loader */}
              <circle
                className="loader-arc"
                cx={cx} cy={cy} r={r}
                stroke="#f7f3ee" strokeWidth="2.5" fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {/* Lens center dot */}
              <circle cx={cx} cy={cy} r="4" fill="#c8b89a" opacity="0.5" />
              <circle cx={cx} cy={cy} r="1.5" fill="#e8dcc8" opacity="0.9" />

              {/* Lens highlight glint */}
              <ellipse cx="47" cy="47" rx="5" ry="3"
                fill="white" opacity="0.07"
                transform="rotate(-35 47 47)"
              />
            </svg>
          </div>

          {/* Studio name */}
          <div
            className="studio-name font-jost text-center font-bold uppercase tracking-[0.38em] text-[#B8935A]"
            style={{ fontSize: "clamp(20px, 4vw, 28px)", lineHeight: 1 }}
          >
            Shriji Studio
          </div>

          {/* Divider */}
          <div className="divider-line my-[18px] flex items-center gap-3">
            <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, #7a6a55)" }} />
            <div className="h-1 w-1 rounded-full bg-[#7a6a55] opacity-70" />
            <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, #7a6a55)" }} />
          </div>

          {/* Tagline */}
        
          {/* Loading dots */}
          <div className="loading-dots flex items-center">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </div>
    </>
  );
}