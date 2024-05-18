import ProductDetailDiv from "@/app/components/product-detail-component/product-detail-div";
import Recommendations from "@/app/components/product-detail-component/recommendations";
import RouteSummary from "@/app/components/route-summary";
import { IProduct } from "@/models/products";
import { redirect } from "next/navigation";
import React from "react";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const url = `http://localhost:3000/api/products/${id}`;

  const response = await fetch(url);
  console.log("Status: " + response.status);
  const products = await response.json();
  const product: IProduct = products.existingProduct;
  if (response.status == 404 || product == undefined) {
    return redirect("/home");
  }
  return (
    <>
      <div className="container scroll-smooth max-w-full my-0 mx-auto px-2 py-0">
        <div>
          <RouteSummary
            category={product.category}
            subCategory={product.subCategory}
          />
        </div>
        <div>
          <ProductDetailDiv product={product} />
        </div>
        <div>
          <Recommendations />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
