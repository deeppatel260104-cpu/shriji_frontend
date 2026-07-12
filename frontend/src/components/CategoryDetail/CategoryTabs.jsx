export default function CategoryTabs({ activeTab, onTabChange, hasVideos }) {
    if (!hasVideos) return null;

    const tabs = ["photos", "videos"];

    return (
        <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#e8e0d5] p-1.5 rounded-full gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`px-10 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-none cursor-pointer capitalize
                            ${activeTab === tab
                                ? "bg-[#f7f3ee] text-[#2c2420] shadow-sm"
                                : "bg-transparent text-[#0d0b08] hover:text-[#2c2420]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}