'use client'
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

  console.log('products:', products);

  return (
    <div className=" min-h-screen py-8">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div className="card bg-base-100 shadow-sm" key={product.id}>
              <figure className="aspect-square object-fit-cover">
                <img
                  src={product.thumbnail}
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-center">
                  <Link href={`/product/${product?.slug}`}  className="btn bg-[#00A788] text-white border-0 capitalize  w-full">Add to cart</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
