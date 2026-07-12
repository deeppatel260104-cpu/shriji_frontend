// pages/Category/CategoryDetailPage.jsx

import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/categoryAction";
import { getImagesByCategory } from "../../actions/imageAction";
import { getVideosByCategory } from "../../actions/videoAction";
import Navbar from "../../components/Navbar/Navbar";
import CategoryTabs from "./CategoryTabs";
import CategoryPhotoGrid from "./CategoryPhotoGrid";
import CategoryVideoGrid from "./CategoryVideoGrid";
import HeroCategory from "./HeroCategory";
import Footer from './../Footer/Footer';
import ImageText from "../helper/ImageText";

export default function CategoryDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categories, loading: catLoading } = useSelector((state) => state.categoriesReducer);
    const { images, loading: imgLoading } = useSelector((state) => state.imagesReducer);
    const { videos, loading: vidLoading } = useSelector((state) => state.videosByCategoryReducer);

    const [activeTab, setActiveTab] = useState("photos");
    const detailRef = useRef(null);

    const cat = (categories || []).find((c) => c.slug === slug);
    const hasVideos = (videos || []).length > 0;

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (cat?.id) {
            dispatch(getImagesByCategory(cat.id));
            dispatch(getVideosByCategory(cat.id));
        }
    }, [dispatch, cat?.id]);

    useEffect(() => {
        if (detailRef.current) {
            detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [slug]);

    // ── Loading state ──
    if (catLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    // ── Category not found ──
    if (!cat) {
        return (
            <div className=" min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-lg">Category not found</p>
                <button
                    onClick={() => navigate("/")}
                    className="text-sm font-semibold text-gray-900 underline"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className=" min-h-screen font-sans overflow-x-hidden">
            <Navbar />

            {/* ── Hero Banner ── */}
            <HeroCategory
                images={images}
                catName={cat.name}
                totalCount={(images || []).length}
            />

            {/* ── Detail Section ── */}
            <section className="max-w-[1200px] mx-auto py-20 px-6" ref={detailRef}>

                {/* Back Button */}
                <button
                    className="flex items-center gap-2 text-[#0d0b08] text-sm font-semibold  hover:text-[#2c2420] transition-colors cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <span className="text-lg">←</span> Back
                </button>



                {/* Tabs */}
                <CategoryTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    hasVideos={hasVideos}
                />

                {/* Photos Tab */}
                {activeTab === "photos" && (
                    <CategoryPhotoGrid
                        images={images || []}
                        loading={imgLoading}
                        pinterestLink={cat.pinterest_link}
                    />
                )}

                {/* Videos Tab */}
                {activeTab === "videos" && (
                    <CategoryVideoGrid
                        videos={videos || []}
                        loading={vidLoading}
                        catName={cat.name}
                    />
                )}

            </section>  
            <ImageText />

            <Footer />
        </div>
    );
}
