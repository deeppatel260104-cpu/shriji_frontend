// components/Category/HeroCategory.jsx

import { useMemo, useRef, useState, useEffect } from "react";

export default function HeroCategory({ images, catName, }) {
    const [current, setCurrent] = useState(0);
    const isMobile = useIsMobile();

    const desktopImages = useMemo(() => {
        const slideshowImages = images?.filter((img) => (
            img.show_in_slideshow === true ||
            img.show_in_slideshow === 1 ||
            img.show_in_slideshow === "1"
        )) || [];
        return [...slideshowImages].sort(() => Math.random() - 0.5);
    }, [images]);

    const mobileImages = useMemo(() => {
        const slideshowImages = images?.filter((img) => (
            img.show_in_mobile_slideshow === true ||
            img.show_in_mobile_slideshow === 1 ||
            img.show_in_mobile_slideshow === "1"
        )) || [];
        return [...slideshowImages].sort(() => Math.random() - 0.5);
    }, [images]);

    const shuffledImages = isMobile ? mobileImages : desktopImages;

    useEffect(() => {
        setCurrent(0);
    }, [isMobile, desktopImages, mobileImages]);

    useEffect(() => {
        if (shuffledImages.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % shuffledImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [shuffledImages.length]);

    if (!shuffledImages.length) return null;

    const total = shuffledImages.length;
    const visibleIndexes = total <= 1 ? [0] : [current, (current + 1) % total];
    return (
        <div className="relative w-full overflow-hidden mt-14 md:mt-16"
            style={{ height: "100svh" }}
        >
            {/* ── Slides ── */}
            {visibleIndexes.map((i) => {
                const img = shuffledImages[i];
                return (
                    <div
                        key={`${img.id || i} - ${i}`}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ opacity: i === current ? 1 : 0 }}
                    >
                        <img
                            src={img.image_desktop}
                            alt={catName}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                );
            })}

            {/* ── Dark overlay ── */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* ── Center text ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3 px-4 md:px-6">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-px bg-[#B8935A]" />
                    <p className="font-jost font-normal text-[#B8935A] text-[11px] tracking-[4px] uppercase">
                        Collection
                    </p>
                    <div className="w-10 h-px bg-[#B8935A]" />
                </div>
                <h1 className="text-[#f7f3ee] font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.08em] md:tracking-[0.12em] uppercase m-0 drop-shadow-2xl text-center leading-tight">
                    {catName}
                </h1>
            </div>

            {/* ── Swipe support (mobile) ── */}
            <SwipeHandler
                onSwipeLeft={() => setCurrent((p) => (p + 1) % total)}
                onSwipeRight={() => setCurrent((p) => (p - 1 + total) % total)}
            />

            {/* ── Progress bar ── */}
            {total > 1 && (
                <div
                    key={`progress-${current}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-white/70 z-20"
                    style={{ animation: "heroProgress 4s linear forwards" }}
                />
            )}

            <style>{`
                @keyframes heroProgress {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </div>
    );
}

/* ── Touch swipe handler ── */
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(max-width: 767px)").matches;
    });

    useEffect(() => {
        const query = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    return isMobile;
}

function SwipeHandler({ onSwipeLeft, onSwipeRight }) {
    const startX = useRef(null);

    return (
        <div
            className="absolute inset-0 z-10"
            onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
                if (startX.current === null) return;
                const diff = startX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? onSwipeLeft() : onSwipeRight();
                }
                startX.current = null;
            }}
        />
    );
}
