// components/Category/CategoryPhotoGrid.jsx

// ── Pattern: per block = [full, full, 2col, full, 2col, 2col]
// images used per block = 1+1+2+1+2+2 = 9
const PATTERN = ["full", "full", "half", "full", "half", "half"];

function buildRows(images) {
    const rows = [];
    let i = 0;
    let patternIndex = 0;

    while (i < images.length) {
        const type = PATTERN[patternIndex % PATTERN.length];

        if (type === "full") {
            rows.push({ type: "full", images: [images[i]] });
            i += 1;
        } else {
            // half — 2 images chahiye, ek j hoy to full banavo
            if (i + 1 < images.length) {
                rows.push({ type: "half", images: [images[i], images[i + 1]] });
                i += 2;
            } else {
                rows.push({ type: "full", images: [images[i]] });
                i += 1;
            }
        }
        patternIndex++;
    }
    return rows;
}

export default function CategoryPhotoGrid({ images = [], loading = false, pinterestLink = "" }) {
    const cleanPinterestLink = pinterestLink?.trim();
    const pinterestHref = cleanPinterestLink?.startsWith("http")
        ? cleanPinterestLink
        : `https://${cleanPinterestLink}`;

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    const rows = buildRows(images);

    if (rows.length === 0) {
        return (
            <p className="text-center text-gray-400 text-sm py-20">
                No photos available yet.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {rows.map((row, ri) => (
                <div key={ri} className="flex gap-3 w-full">

                    {/* ── Full width row ── */}
                    {row.type === "full" && (
                        <div className="w-full overflow-hidden">
                            <img
                                src={row.images[0].image_desktop}
                                alt={row.images[0].title || `Photo ${ri + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    )}

                    {/* ── 2 col row ── */}
                    {row.type === "half" && row.images.map((img, ii) => (
                        <div key={ii} className="flex-1 overflow-hidden">
                            <img
                                src={img.image_desktop}
                                alt={img.title || `Photo ${ri}-${ii}`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ))}

                </div>
            ))}

            {cleanPinterestLink && (
                <div className="flex justify-center pt-10">
                    <a
                        href={pinterestHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#e60023] text-white text-sm font-semibold tracking-[0.04em] hover:bg-[#c9001f] transition-colors"
                    >
                        Show more photos on Pinterest
                    </a>
                </div>
            )}
        </div>
    );
}
