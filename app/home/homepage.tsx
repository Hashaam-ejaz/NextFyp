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
import { useSession } from "next-auth/react";
import { IOrder } from "@/models/orders";

const Homepage = () => {
  const [products, setProducts] = useState<IProduct[] | null>([]);
  const [recommendations, setRecommendations] = useState<IProduct[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { data: session } = useSession();
  // console.log("Session:", session);
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

  useEffect(() => {
    
    const fetchRecommendations1 = async () => {
      try {
        const userRes = await fetch(`http://localhost:3000/api/users?email=${session?.user?.email}`)
        const userData = await userRes.json();
        const user = userData.existingUser;
        setUserId(user._id);
        const userOrdersRes = await fetch(`http://localhost:3000/api/orders/${user._id}`);
        const userOrdersData = await userOrdersRes.json();
        const userOrders = userOrdersData.orders;
        const productIds = userOrders.map((order : IOrder) => order.products.map((product) => product.productID));

        const prodSKURes = await fetch(`http://localhost:3000/api/products/${productIds[0].toString()}`);
        const prodData = await prodSKURes.json();
        const prod = prodData.existingProduct;

        const response = await fetch("http://localhost:3000/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: user.recom_id,
            productid: prod.sku,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        // console.log("Recommendations data:", data);
        const recommendedProductIds = data.recommended_products;
        // console.log("Recommended products:", recommendedProductIds);

        const recommendedProductsPromises = recommendedProductIds.map(async (id: string) => {
          const productResponse = await fetch(`http://localhost:3000/api/products/sku/${id}`);
          return await productResponse.json();
        });

        const recommendedProductsData = await Promise.all(recommendedProductsPromises);
        // console.log("Recommended products data:", recommendedProductsData);
        const uniqueProductIds = new Set();
        const filteredRecommendedProductsData = recommendedProductsData
          .filter(productGroup => productGroup && productGroup.products && productGroup.products[0])
          .map(productGroup => productGroup.products[0])
          .filter(product => {
            if (!uniqueProductIds.has(product._id)) {
              uniqueProductIds.add(product._id);
              return true;
            }
            return false;
          });
          // console.log("Filtered recommended products data:", filteredRecommendedProductsData);
        setRecommendations(filteredRecommendedProductsData);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations1();
  }, [session]);

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
      <RecommendedProductsDiv recommendations={recommendations.length === 0? featuredProducts : recommendations} />
    </>
  );
};

export default Homepage;
