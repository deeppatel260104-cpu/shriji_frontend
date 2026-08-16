// components/Category/CategoryGrid.jsx

import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/categoryAction";
import { useEffect } from "react";

export default function CategoryGrid() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categoriesReducer);

    useEffect(() => {
        if(!categories.length){
            dispatch(getAllCategories());
        }
    }, [dispatch, categories.length]);

    // order_index 0 = disabled, filter + sort
    const sortedCategories = [...(categories || [])]
        .filter((cat) => cat.order_index !== 0)
        .sort((a, b) => a.order_index - b.order_index);

    if (loading && !categories.length) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    if (sortedCategories.length === 0) {
        return (
            <p className="text-center text-gray-400 text-sm py-20">
                No categories available
            </p>
        );
    }

    return (
        <>
            <section className="max-w-[1200px] mx-auto py-20 px-6">

                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-10">
                    {sortedCategories.map((cat) => (
                        <CategoryCard
                            key={cat.id}
                            cat={cat}
                            onNavigate={() => navigate(`/category/${cat.slug}`)}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
