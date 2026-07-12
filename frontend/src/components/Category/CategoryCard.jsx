// components/Category/CategoryCard.jsx

export default function CategoryCard({ cat, onNavigate }) {
    return (
        <div
            className="group cursor-pointer transition-transform duration-400"
            onClick={onNavigate}
        >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight transition-colors group-hover:text-amber-700">
                {cat.name}
            </h3>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md shadow-md transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <img
                    src={cat.thumbnail_image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-400 group-hover:bg-black/25" />
                <button className="absolute bottom-6 right-6 bg-gray-900 text-white text-[10px] font-bold tracking-[0.2em] px-7 py-3 opacity-0 translate-y-4 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 uppercase border-none cursor-pointer hover:bg-gray-800">
                    Explore
                </button>
            </div>
        </div>
    );
}
