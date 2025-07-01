'use client'
import { fixImageUrl } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-sm h-full" key={product.id}>
        <figure className="aspect-square object-fit-cover">
          <img src={fixImageUrl(product.thumbnail)} alt="Shoes" />
        </figure>
        <div className="card-body text-center">
          <div className="tooltip" data-tip={product.name}>
          <h2 className="card-title text-sm text-[#00A788] truncate" >{product.name}</h2>
          </div>
          <div className="flex justify-center gap-2">
            <h4 className="text-sm text-neutral-800 font-semibold">
              ৳{product?.discount_price}
            </h4>
            <h4 className="text-sm text-neutral-400 line-through">
              ৳{product?.regular_price}
            </h4>
          </div>
          <div className="card-actions justify-center">
            <Link
              href={`/product/${product?.slug}`}
              className="btn bg-[#00A788] text-white border-0 capitalize  w-full"
            >
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
