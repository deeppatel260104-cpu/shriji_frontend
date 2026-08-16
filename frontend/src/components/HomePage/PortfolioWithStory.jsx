import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagesByCategory } from "../../actions/imageAction";
import { Link } from "react-router-dom";

const PreWeddingStory = ({ categorySlug }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const isMobile = useIsMobile();

  const {categories} = useSelector((state) => state.categoriesReducer);
  const category = (categories || []).find((c) => c.slug === categorySlug);
  console.log("categories", categories)
  const categoryId = category?.id;
  const images = useSelector(
    (state) => state.imagesReducer?.imagesByCategory?.[categoryId] || []
  );
  const  imgLoding = useSelector(
    (state) => Boolean(state.imagesReducer?.loadingByCategory?.[categoryId])
  )

  useEffect(() => {
    if (categoryId) {
      dispatch(getImagesByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const storyImages = useMemo(() => {
    const field = isMobile ? "show_in_mobile_slideshow" : "show_in_slideshow";
    return (images || []).filter((img) => (
      img[field] === true ||
      img[field] === 1 ||
      img[field] === "1"
    ));
  }, [images, isMobile]);

  // ✅ Reset when category changes
  useEffect(() => {
    setSelectedImage(null);
  }, [categoryId, isMobile]);

  // ✅ Select random image properly
  useEffect(() => {
    if (storyImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * storyImages.length);
      setSelectedImage(storyImages[randomIndex]);
    }
  }, [storyImages]);

  if (imgLoding && !selectedImage) {
    return (
      <section className="relative w-full h-40 flex items-center justify-center bg-[#2c2420]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"/>
      </section>
    );
  }

  if(!selectedImage || !category) {
    return null;
  }

  return (
    <section className="relative">

      {/* Parallax fixed background */}
      <div
        className="relative w-full h-screen overflow-hidden"
        style={{ isolation: "isolate" }}
      >
        {/* Fixed background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${selectedImage.image_desktop})`,
            backgroundAttachment: isMobile? "scroll" : "fixed",
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-20 max-w-3xl">


          {/* Title */}
          <h2
            className="font-playfair font-light text-[#f7f3ee] leading-[1.1] mb-6 tracking-[-0.01em]"
            style={{ fontSize: "clamp(42px, 6vw, 80px)" }}
          >
            {category.name}
            <br />
            <em className="italic text-[#B8935A]">Stories</em>
          </h2>

          {/* Description */}
          <p className="text-[15px] font-jost text-[#f7f3ee]/60 font-light leading-[1.8] max-w-md mb-10 tracking-[0.02em]">
            Every love story deserves to be told beautifully. We craft intimate,
            cinematic pre-wedding shoots that capture the magic between two people —
            before the big day begins.
          </p>

          {/* CTA */}
          <div>
            <Link to={`/category/${categorySlug}`}>
            <button className="inline-flex items-center gap-3 px-8 py-[14px] bg-transparent border border-[#f7f3ee] text-white text-[11px] font-jost font-normal  tracking-[0.22em] uppercase cursor-pointer rounded-[2px] transition-all duration-300 hover:bg-[#B8935A] hover:border-[#B8935A] hover:text-[#2c2420]">
              View Full Story
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            </Link>
          </div>


        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1);   }
          50%       { opacity: 0.9; transform: scaleY(1.4); }
        }
      `}</style>
    </section>
  );
}

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

export default PreWeddingStory
