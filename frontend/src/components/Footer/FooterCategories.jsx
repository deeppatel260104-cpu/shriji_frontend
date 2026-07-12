import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/categoryAction";
import SectionHeading from "./SectionHeading";
import FooterLink from "./FooterLink";

const FooterCategories = () => {
  const dispatch = useDispatch();

  const { categories = [] } = useSelector(
    (state) => state.categoriesReducer
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories.length]);

  const sortedCategories = categories
    .filter((cat) => cat.order_index > 0)
    .sort(
      (a, b) => (a.order_index || 0) - (b.order_index || 0)
    );

  return (
    <div>
      <SectionHeading>Categories</SectionHeading>

      <div className="flex flex-col gap-0.5">
        {sortedCategories.map((cat) => (
          <FooterLink
            key={cat.id}
            href={`/category/${cat.slug}`}
          >
            {cat.name}
          </FooterLink>
        ))}
      </div>
    </div>
  );
};

export default FooterCategories;