"use client";
import SingleProductDiv from "@/app/components/SingleProductDiv";
import { IProduct } from "@/models/products";
import { Input } from "postcss";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<IProduct[]>([]);

  function getFirstValue(queryString: string) {
    const firstEqualsIndex = queryString.indexOf("=");
    if (firstEqualsIndex === -1) {
      return "";
    }
    const secondEqualsIndex = queryString.indexOf("=", firstEqualsIndex + 1);
    if (secondEqualsIndex === -1) {
      return queryString.slice(firstEqualsIndex + 1);
    }
    return queryString.slice(firstEqualsIndex + 1, secondEqualsIndex);
  }

  function parseQueryString(queryString: string) {
    queryString = queryString.replace(/%3D/g, "=");
    queryString = queryString.replace(/%26/g, "&");
    queryString = queryString.replace(/%2B/g, " ");
    const params = new URLSearchParams(queryString);
    let categoryName = getFirstValue(queryString);
    categoryName = categoryName.slice(0, categoryName.length - 6);
    const query = params.get("query");
    categoryName = categoryName;
    return { categoryName, query };
  }

  let { categoryName, query } = parseQueryString(params.id);
  useEffect(() => {
    async function fetchData() {
      categoryName = decodeURIComponent(categoryName as string);
      console.log("Cat: " + categoryName);
      console.log("Query: " + query);
      let url: string = `http://localhost:3000/api/products/`;
      if (query == "Enter Search...") {
        query = null;
      }

      if (categoryName && categoryName !== "All Categories") {
        url += `?categoryName=${categoryName}`;
      }
      if (query && categoryName && categoryName !== "All Categories") {
        url += `&query=${query}`;
      }
      if (query && !categoryName) {
        url += `?query=${query}`;
      }
      if (query && categoryName == "All Categories") {
        url += `?query=${query}`;
      }
      console.log("URL: " + url);

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
    }

    fetchData();
    console.table(products);
  }, [params.id]);

  return (
    <div className="flex p-16 flex-col md:flex-row">
      {products.map((product, index) => (
        <div key={product._id || index} className="cursor-pointer p-4">
          <SingleProductDiv prod={product} />
        </div>
      ))}
    </div>
  );
}
