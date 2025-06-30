"use client";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  console.log("products:", products);

  return (
    <div className=" min-h-screen py-8 bg-gray-100">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid xl:grid-cols-4 md:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6">
          {products.map((product) => (
            
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
}
