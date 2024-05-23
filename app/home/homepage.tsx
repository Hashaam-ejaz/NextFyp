"use client";
import CategoryDiv from "../components/homepageComponents/categoryDiv";
import Carousel from "../components/homepageComponents/carousel";
import DealsDiv from "../components/homepageComponents/deals-div";
import CategoryCardDiv from "../components/homepageComponents/category-card-div";
import FeaturedProductsDiv from "../components/homepageComponents/featuredProductsDiv";
import BestSellingProductsDiv from "../components/homepageComponents/bestSellingProductsDiv";
import RecommendedProductsDiv from "../components/homepageComponents/recommendedProductsDiv";
import { useEffect, useState } from "react";
import { IProduct } from "@/models/products";

const Homepage = () => {
  const [products, setProducts] = useState<IProduct[] | null>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products/");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  function getTopSellingProducts(products: IProduct[]): IProduct[] {
    const sortedProducts = products.sort((a, b) => b.noSales - a.noSales);
    return sortedProducts.slice(0, 10);
  }

  function getFeaturedProducts(products: IProduct[]): IProduct[] {
    return products.filter((product) => product.featured);
  }

  function getDiscountedProducts(products: IProduct[]): IProduct[] {
    return products
      .filter((product) => product.discount !== 0) // Filter products with discount
      .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
      .slice(0, 5); // Sort by discount in descending order
  }

  const topSellingProducts = getTopSellingProducts(products as IProduct[]);

  const featuredProducts = getFeaturedProducts(products as IProduct[]);

  const discountedProducts = getDiscountedProducts(products as IProduct[]);

  return (
    <>
      <CategoryDiv />
      <Carousel />
      <DealsDiv discountedProd={discountedProducts} />
      <CategoryCardDiv />
      <FeaturedProductsDiv featuredProd={featuredProducts} />
      <BestSellingProductsDiv bestSellers={topSellingProducts} />
      <RecommendedProductsDiv recommendations={featuredProducts} />
    </>
  );
};

export default Homepage;
