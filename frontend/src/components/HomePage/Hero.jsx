import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroImages } from './../../actions/heroAction';

// ── Fisher-Yates shuffle (returns a new array, never mutates) ──
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Hero() {
  const dispatch = useDispatch();
  const { heroes, loading } = useSelector((state) => state.heroReducer);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    dispatch(getHeroImages());
  }, [dispatch]);

  const slides = useMemo(() => {
    const active = (heroes || []).filter(
      (s) => s.is_active === 1 && (s.mobile_image || s.desktop_image)
    );
    
    const shuffled = shuffleArray(active);
    
    const selected = shuffled.slice(0, 5);
    
    return selected;
  }, [heroes]);   

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating || slides.length === 0) return;
      setAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 600);
    },
    [animating, slides.length]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);


  const getSlideClass = (i) => {
    if (i === current) return "opacity-100 scale-100 z-10";
    if (animating && direction === "next" && i === (current - 1 + slides.length) % slides.length)
      return "opacity-0 scale-105 z-0";
    if (animating && direction === "prev" && i === (current + 1) % slides.length)
      return "opacity-0 scale-95 z-0";
    return "opacity-0 scale-100 z-0";
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-white/40 text-sm">No active hero images available</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-900">

      {slides.map((s, i) => {
        const mobileSrc = s.mobile_image || s.desktop_image;
        const desktopSrc = s.desktop_image || s.mobile_image;

        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${getSlideClass(i)}`}
          >
            <img
              src={mobileSrc}
              alt={`Slide ${i + 1} mobile`}
              className="block md:hidden absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <img
              src={desktopSrc}
              alt={`Slide ${i + 1}`}
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        );
      })}

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12
          flex items-center justify-center rounded-full
          bg-white/10 border border-white/25 text-white
          backdrop-blur-sm transition-all duration-200
          hover:bg-white/25 hover:scale-110"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12
          flex items-center justify-center rounded-full
          bg-white/10 border border-white/25 text-white
          backdrop-blur-sm transition-all duration-200
          hover:bg-white/25 hover:scale-110"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[6px] rounded-full border-none cursor-pointer p-0 transition-all duration-300
              ${i === current ? "w-7 bg-white" : "w-[6px] bg-white/40"}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        key={`progress-${current}`}
        className="absolute bottom-0 left-0 h-[2px] bg-white/90 z-20 animate-progress"
      />

      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .animate-progress { animation: progress 5s linear forwards; }
      `}</style>
    </section>
  );
}
