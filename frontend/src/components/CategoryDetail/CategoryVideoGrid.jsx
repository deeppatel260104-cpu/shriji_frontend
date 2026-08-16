// components/Category/CategoryVideoGrid.jsx
function toYouTubeEmbed(url) {
    if(!url) return "";
    const match = String(url).match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? `http://www.youtube.com/embed/${match[1]}` : url;
}
export default function CategoryVideoGrid({ videos = [], loading = false, catName = "" }) {
    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <p className="text-center text-gray-400 text-sm py-20">
                No videos available yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, i) => (
                <div key={video.id || i} className="flex flex-col gap-3">

                    {/* 16:9 iFrame */}
                    <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                        {video ? (
                            <iframe
                                className="w-full h-full"
                                src={toYouTubeEmbed(video.youtube_url)}
                                title={video.title || `${catName} video ${i + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-400 text-xs">Video unavailable</p>
                            </div>
                        )}
                    </div>

                    {/* Title + Description */}
                    {(video.title || video.description) && (
                        <div className="flex flex-col gap-1 px-1">
                            {video.title && (
                                <p className="text-gray-900 font-bold text-sm uppercase tracking-widest">
                                    {video.title}
                                </p>
                            )}
                            {video.description && (
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {video.description}
                                </p>
                            )}
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}
