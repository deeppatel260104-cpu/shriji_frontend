import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();
  const { categories, loading } = useSelector((state) => state.categoriesReducer);
  const sortedCategories = [...(categories || [])]

  .filter((cat) => cat.order_index !== 0)  
  .sort((a, b) => a.order_index - b.order_index); 
  const extraDesktopRows = Math.ceil(Math.max(sortedCategories.length - 8, 0) / 4);

  if (loading && !categories.length) {
    return (
      <section className="bg-[#ede8e0] px-4 sm:px-8 lg:px-10 py-16 sm:py-20 flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-2 border-[#B8935A]/30 border-t-[#B8935A] rounded-full animate-spin" />
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="bg-[#ede8e0] px-4 sm:px-8 lg:px-10 py-16 sm:py-20 flex items-center justify-center min-h-[400px]">
        <p className="text-[#B8935A]/60 text-sm">No categories available</p>
      </section>
    );
  }

  return (
    <section className="bg-[#ede8e0] px-4 sm:px-8 lg:px-10 py-16 sm:py-20">
      <style>{`
        .d2-card img { transition: transform 0.6s ease; }
        .d2-card:hover img { transform: scale(1.07); }
        .d2-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 30px 70px rgba(61,36,16,0.25); }
        .d2-card:hover .d2-overlay { background: linear-gradient(to top, rgba(61,36,16,0.95) 0%, rgba(61,36,16,0.2) 100%); }
        .d2-sub { opacity: 0; transform: translateY(8px); transition: all 0.3s ease; }
        .d2-card:hover .d2-sub { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ── Header ── */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-px bg-[#B8935A]" />
          <span className="font-jost font-normal text-[#B8935A] text-[11px] tracking-[4px] uppercase">
            Category
          </span>
          <div className="w-10 h-px bg-[#B8935A]" />
        </div>
        <h2 className="text-[clamp(32px,5vw,54px)] font-playfair font-medium leading-tight m-0">
          <em style={{ color: "#B8935A" }}>Our Specialties</em>
        </h2>
      </div>

      {/* ── Mobile grid ── */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {sortedCategories.map((cat) => (
          <Card key={cat.id} cat={cat} nameSize="text-lg" height="h-44" onNavigate={() => navigate(`/category/${cat.slug}`)} />
        ))}
      </div>

      {/* ── Tablet grid ── */}


{/* Tablet */}
<div className="hidden md:grid lg:hidden grid-cols-2 gap-3 max-w-2xl mx-auto"
  style={{ gridTemplateRows: `repeat(${Math.ceil(sortedCategories.length / 2) + 1}, 160px)` }}
>
  {sortedCategories.map((cat, i) => (
    <Card
      key={cat.id}
      cat={cat}
      nameSize="text-xl"
      className={i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
      onNavigate={() => navigate(`/category/${cat.slug}`)}
    />
  ))}
</div>

{/* Desktop */}
<div className="hidden lg:grid gap-3.5 mx-auto"
  style={{ maxWidth: 1100, gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: `repeat(${3 + extraDesktopRows}, 200px)` }}
>
  {sortedCategories[0] && <Card cat={sortedCategories[0]} nameSize="text-2xl" style={{ gridArea: "1 / 1 / 3 / 3" }} onNavigate={() => navigate(`/category/${sortedCategories[0].slug}`)} />}
  {sortedCategories[1] && <Card cat={sortedCategories[1]} nameSize="text-xl"  style={{ gridArea: "1 / 3 / 2 / 4" }} onNavigate={() => navigate(`/category/${sortedCategories[1].slug}`)} />}
  {sortedCategories[2] && <Card cat={sortedCategories[2]} nameSize="text-2xl" style={{ gridArea: "1 / 4 / 3 / 5" }} onNavigate={() => navigate(`/category/${sortedCategories[2].slug}`)} />}
  {sortedCategories[3] && <Card cat={sortedCategories[3]} nameSize="text-xl"  style={{ gridArea: "2 / 3 / 3 / 4" }} onNavigate={() => navigate(`/category/${sortedCategories[3].slug}`)} />}
  {sortedCategories[4] && <Card cat={sortedCategories[4]} nameSize="text-xl"  style={{ gridArea: "3 / 1 / 4 / 2" }} onNavigate={() => navigate(`/category/${sortedCategories[4].slug}`)} />}
  {sortedCategories[5] && <Card cat={sortedCategories[5]} nameSize="text-xl"  style={{ gridArea: "3 / 2 / 4 / 3" }} onNavigate={() => navigate(`/category/${sortedCategories[5].slug}`)} />}
  {sortedCategories[6] && <Card cat={sortedCategories[6]} nameSize="text-xl"  style={{ gridArea: "3 / 3 / 4 / 4" }} onNavigate={() => navigate(`/category/${sortedCategories[6].slug}`)} />}
  {sortedCategories[7] && <Card cat={sortedCategories[7]} nameSize="text-xl"  style={{ gridArea: "3 / 4 / 4 / 5" }} onNavigate={() => navigate(`/category/${sortedCategories[7].slug}`)} />}
  {sortedCategories.slice(8).map((cat, i) => {
    const row = 4 + Math.floor(i / 4);
    const col = 1 + (i % 4);
    return (
      <Card
        key={cat.id}
        cat={cat}
        nameSize="text-xl"
        style={{ gridArea: `${row} / ${col} / ${row + 1} / ${col + 1}` }}
        onNavigate={() => navigate(`/category/${cat.slug}`)}
      />
    );
  })}
</div>
    </section>
  );
}

/* ── Reusable Card ── */
function Card({ cat, nameSize = "text-xl", height = "", className = "", style = {}, onNavigate }) {
  return (
    <div
      onClick={onNavigate}
      className={`d2-card relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-[450ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${height} ${className}`}
      style={style}
    >
      <img
        src={cat.thumbnail_image}
        alt={cat.name}
        className="w-full h-full object-cover block"
      />

      <div
        className="d2-overlay absolute inset-0 flex flex-col justify-end px-4 pb-4 sm:px-5 sm:pb-5 transition-all duration-300"
        style={{ background: "linear-gradient(to top, rgba(61,36,16,0.88) 0%, transparent 60%)" }}
      >
        <p className="d2-sub font-jost text-[10px] sm:text-[11px] tracking-[2.5px] uppercase text-[#B8935A] mb-1">
          {cat.slug}
        </p>
        <h3 className={`${nameSize} m-0 font-  text-[#f7f3ee]`}>
          {cat.name}
        </h3>
      </div>
    </div>
  );
}
