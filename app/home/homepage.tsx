import CategoryDiv from "../components/homepageComponents/categoryDiv";
import Carousel from "../components/homepageComponents/carousel";
import DealsDiv from "../components/homepageComponents/deals-div";
import CategoryCardDiv from "../components/homepageComponents/category-card-div";
// import BestSellingProductsDiv from "../components/homepageComponents/bestSellingProductsDiv";
// import RecommendedProductsDiv from "../components/homepageComponents/recommendedProductsDiv";
// import FeaturedProductsDiv from "../components/homepageComponents/featuredProductsDiv";

const Homepage = () => {
  return (
    <>
      <CategoryDiv />
      <Carousel />
      <DealsDiv />
      <CategoryCardDiv />
      {/*<BestSellingProductsDiv />
      <RecommendedProductsDiv />
      <FeaturedProductsDiv /> */}
    </>
  );
};

export default Homepage;
