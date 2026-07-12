import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../actions/categoryAction";
import { getHeroImages } from "../../../actions/heroAction";
import { getAllImages } from "../../../actions/imageAction";
import { getAllVideos } from "../../../actions/videoAction";

// ─── Icons ────────────────────────────────────────────────────────────────────
const HeroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path strokeLinecap="round" d="M3 9h18" />
  </svg>
);
const CatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);
const ImgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
  </svg>
);
const VidIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
  </svg>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, count, icon, accent, sub }) => (
  <div
    className="flex flex-col gap-3 rounded-2xl p-5"
    style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}
  >
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "rgba(44,36,32,0.5)" }}>
        {label}
      </span>
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: accent + "18", color: accent }}
      >
        {icon}
      </div>
    </div>
    <div className="text-4xl font-bold" style={{ color: "#0d0b08", lineHeight: 1 }}>
      {count ?? <span className="text-2xl animate-pulse" style={{ color: "rgba(44,36,32,0.2)" }}>—</span>}
    </div>
    {sub && (
      <div className="text-[11px]" style={{ color: "rgba(44,36,32,0.45)" }}>{sub}</div>
    )}
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionTitle = ({ children }) => (
  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(44,36,32,0.4)" }}>
    {children}
  </div>
);

// ─── Image Thumb ──────────────────────────────────────────────────────────────
const Thumb = ({ url }) => (
  <div
    className="w-12 h-8 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
    style={{ backgroundColor: "#ede8e2", border: "1px solid rgba(44,36,32,0.15)" }}
  >
    {url ? (
      <img src={url} alt="" className="w-full h-full object-cover" />
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(44,36,32,0.25)" strokeWidth={1.5} className="w-4 h-4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
      </svg>
    )}
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ children, color }) => {
  const styles = {
    green:  { bg: "#e1f5ee", text: "#0f6e56", border: "#9fe1cb" },
    amber:  { bg: "#faeeda", text: "#854f0b", border: "#fac775" },
    gray:   { bg: "#f1efe8", text: "#5f5e5a", border: "#d3d1c7" },
    purple: { bg: "#eeedfe", text: "#534ab7", border: "#cecbf6" },
  };
  const s = styles[color] || styles.gray;
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {children}
    </span>
  );
};

// ─── Layout Bar ───────────────────────────────────────────────────────────────
const LayoutBar = ({ full, half }) => {
  const total = full + half || 1;
  const fullPct = Math.round((full / total) * 100);
  const halfPct = 100 - fullPct;
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <div className="w-20 text-[11px]" style={{ color: "rgba(44,36,32,0.5)" }}>Full</div>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#ede8e2" }}>
          <div className="h-full rounded-full" style={{ width: `${fullPct}%`, backgroundColor: "#1D9E75" }} />
        </div>
        <div className="text-[11px] font-semibold w-8 text-right" style={{ color: "#0d0b08" }}>{full}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-20 text-[11px]" style={{ color: "rgba(44,36,32,0.5)" }}>Half</div>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#ede8e2" }}>
          <div className="h-full rounded-full" style={{ width: `${halfPct}%`, backgroundColor: "#EF9F27" }} />
        </div>
        <div className="text-[11px] font-semibold w-8 text-right" style={{ color: "#0d0b08" }}>{half}</div>
      </div>
    </div>
  );
};

// ─── Hero Status Bar ──────────────────────────────────────────────────────────
const HeroStatusBar = ({ heroes }) => {
  const active = heroes.filter((h) => h.is_active).length;
  const inactive = heroes.length - active;
  const pct = heroes.length ? Math.round((active / heroes.length) * 100) : 0;
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <div className="w-20 text-[11px]" style={{ color: "rgba(44,36,32,0.5)" }}>Active</div>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#ede8e2" }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#1D9E75" }} />
        </div>
        <div className="text-[11px] font-semibold w-8 text-right" style={{ color: "#0d0b08" }}>{active}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-20 text-[11px]" style={{ color: "rgba(44,36,32,0.5)" }}>Inactive</div>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#ede8e2" }}>
          <div className="h-full rounded-full" style={{ width: `${100 - pct}%`, backgroundColor: "#D3D1C7" }} />
        </div>
        <div className="text-[11px] font-semibold w-8 text-right" style={{ color: "#0d0b08" }}>{inactive}</div>
      </div>
    </div>
  );
};

// ─── Category Distribution ────────────────────────────────────────────────────
const CategoryDistribution = ({ categories, images, videos }) => {
  const dots = ["#5DCAA5", "#7F77DD", "#EF9F27", "#D85A30", "#D4537E", "#378ADD"];
  return (
    <div className="flex flex-col gap-2 mt-2">
      {categories.slice(0, 6).map((cat, i) => {
        const imgCount = images.filter((img) => String(img.category_id) === String(cat.id || cat._id)).length;
        const vidCount = videos.filter((v) => String(v.category_id) === String(cat.id || cat._id)).length;
        const total = imgCount + vidCount;
        const maxTotal = 20;
        return (
          <div key={cat.id || cat._id} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dots[i % dots.length] }} />
            <div className="text-[12px] font-medium truncate flex-1" style={{ color: "#0d0b08", maxWidth: "110px" }}>
              {cat.name}
            </div>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#ede8e2" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.min((total / maxTotal) * 100, 100)}%`, backgroundColor: dots[i % dots.length] }}
              />
            </div>
            <div className="text-[11px] font-semibold w-6 text-right" style={{ color: "rgba(44,36,32,0.6)" }}>{total}</div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const dispatch = useDispatch();

  const { heroes = [], loading: heroLoad }      = useSelector((s) => s.heroReducer || {});
  const { categories = [], loading: catLoad }   = useSelector((s) => s.categoriesReducer || {});
  const { images = [], loading: imgLoad }        = useSelector((s) => s.allImagesReducer || {});
  const { videos = [], loading: vidLoad }        = useSelector((s) => s.allVideosReducer || {});

  useEffect(() => {
    dispatch(getHeroImages());
    dispatch(getAllCategories());
    dispatch(getAllImages());
    dispatch(getAllVideos());
  }, [dispatch]);

  // derived
  const fullImages = images.filter((i) => i.layout_type === "full").length;
  const halfImages = images.filter((i) => i.layout_type === "half").length;
  const activeHeroes = heroes.filter((h) => h.is_active).length;

  const getCategoryName = (id) => {
    const cat = categories.find((c) => String(c.id || c._id) === String(id));
    return cat?.name || "—";
  };

  return (
    <div className="flex-1 overflow-auto p-8" style={{ backgroundColor: "#f7f3ee" }}>

      {/* Page heading */}
      <div className="mb-6">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(44,36,32,0.4)" }}>
          Admin
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "#0d0b08" }}>Overview</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(44,36,32,0.5)" }}>
          Summary of all content across Hero, Categories, Images and Videos
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Hero Banners" count={heroLoad ? null : heroes.length} icon={<HeroIcon />} accent="#2c2420"
          sub={`${activeHeroes} active`} />
        <StatCard label="Categories" count={catLoad ? null : categories.length} icon={<CatIcon />} accent="#534AB7"
          sub="product groups" />
        <StatCard label="Images" count={imgLoad ? null : images.length} icon={<ImgIcon />} accent="#1D9E75"
          sub={`${fullImages} full · ${halfImages} half`} />
        <StatCard label="Videos" count={vidLoad ? null : videos.length} icon={<VidIcon />} accent="#D85A30"
          sub="YouTube links" />
      </div>

      {/* ── Mid row ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* Hero banner status */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}>
          <SectionTitle>Hero status</SectionTitle>
          <div className="text-[13px] font-semibold" style={{ color: "#0d0b08" }}>
            {activeHeroes} / {heroes.length} active
          </div>
          <HeroStatusBar heroes={heroes} />
        </div>

        {/* Image layout split */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}>
          <SectionTitle>Image layouts</SectionTitle>
          <div className="text-[13px] font-semibold" style={{ color: "#0d0b08" }}>
            {images.length} total images
          </div>
          <LayoutBar full={fullImages} half={halfImages} />
        </div>

        {/* Category distribution */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}>
          <SectionTitle>Content per category</SectionTitle>
          <div className="text-[13px] font-semibold mb-1" style={{ color: "#0d0b08" }}>
            Images + Videos
          </div>
          <CategoryDistribution categories={categories} images={images} videos={videos} />
        </div>
      </div>

      {/* ── Bottom row: recent lists ── */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        {/* Recent images */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}>
          <SectionTitle>Recent images</SectionTitle>
          {imgLoad ? (
            <div className="text-sm py-4 text-center" style={{ color: "rgba(44,36,32,0.3)" }}>Loading…</div>
          ) : images.length === 0 ? (
            <div className="text-sm py-4 text-center" style={{ color: "rgba(44,36,32,0.3)" }}>No images yet</div>
          ) : (
            <div className="flex flex-col divide-y" style={{ "--tw-divide-opacity": 1, borderColor: "rgba(44,36,32,0.08)" }}>
              {images.slice(0, 5).map((img) => (
                <div key={img.id || img._id} className="flex items-center gap-3 py-2.5">
                  <Thumb url={img.image_desktop} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: "#0d0b08" }}>
                      {getCategoryName(img.category_id)}
                    </div>
                    <div className="text-[10px]" style={{ color: "rgba(44,36,32,0.45)" }}>
                      Order {img.order_index}
                    </div>
                  </div>
                  <Badge color={img.layout_type === "full" ? "green" : "amber"}>
                    {img.layout_type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent videos */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}>
          <SectionTitle>Recent videos</SectionTitle>
          {vidLoad ? (
            <div className="text-sm py-4 text-center" style={{ color: "rgba(44,36,32,0.3)" }}>Loading…</div>
          ) : videos.length === 0 ? (
            <div className="text-sm py-4 text-center" style={{ color: "rgba(44,36,32,0.3)" }}>No videos yet</div>
          ) : (
            <div className="flex flex-col divide-y" style={{ borderColor: "rgba(44,36,32,0.08)" }}>
              {videos.slice(0, 5).map((vid) => {
                const ytId = vid.youtube_url?.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
                const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
                return (
                  <div key={vid.id || vid._id} className="flex items-center gap-3 py-2.5">
                    <Thumb url={thumb} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate" style={{ color: "#0d0b08" }}>
                        {vid.title || "Untitled"}
                      </div>
                      <div className="text-[10px]" style={{ color: "rgba(44,36,32,0.45)" }}>
                        {getCategoryName(vid.category_id)}
                      </div>
                    </div>
                    <Badge color="purple">video</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Categories list ── */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: "#f7f3ee", border: "1px solid rgba(44,36,32,0.12)" }}>
        <SectionTitle>All categories</SectionTitle>
        {catLoad ? (
          <div className="text-sm py-4 text-center" style={{ color: "rgba(44,36,32,0.3)" }}>Loading…</div>
        ) : (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {categories.map((cat) => {
              const imgCount = images.filter((i) => String(i.category_id) === String(cat.id || cat._id)).length;
              const vidCount = videos.filter((v) => String(v.category_id) === String(cat.id || cat._id)).length;
              return (
                <div
                  key={cat.id || cat._id}
                  className="flex items-center gap-3 rounded-xl p-3"
                  style={{ backgroundColor: "#ede8e2", border: "1px solid rgba(44,36,32,0.1)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: "#d9d4ce", border: "1px solid rgba(44,36,32,0.12)" }}
                  >
                    {cat.thumbnail_image ? (
                      <img src={cat.thumbnail_image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CatIcon />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate" style={{ color: "#0d0b08" }}>{cat.name}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "rgba(44,36,32,0.5)" }}>
                      {imgCount} img · {vidCount} vid
                    </div>
                  </div>
                </div>
              );
            })}
            {categories.length === 0 && (
              <div className="col-span-full text-sm py-4 text-center" style={{ color: "rgba(44,36,32,0.3)" }}>
                No categories yet
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
