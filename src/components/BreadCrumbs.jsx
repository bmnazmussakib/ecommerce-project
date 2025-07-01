"use client";
import { fetchCategories } from "@/lib/api";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BreadCrumbsSkeleton from "./skeleton/BreadCrumbsSkeleton";

const BreadCrumbs = ({ data }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCategories();
        const validCategories = (response?.data || []).filter(
          (cat) => cat && Object.keys(cat).length > 0
        );
        setCategories(validCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const category = categories.find((cat) => cat.id === data?.category_id);

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="breadcrumbs text-sm">
          {isLoading ? (
            <BreadCrumbsSkeleton />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="flex space-x-2">
              <li>
                <Link href="/" aria-current={!category ? "page" : undefined}>
                  Home
                </Link>
              </li>

              {category && (
                <>
                  <li>
                    <Link
                      href={`/category/${category.slug}`}
                      aria-current={data?.name ? undefined : "page"}
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}

              {data?.name && (
                <>
                  <li>
                    <Link href={`/product/${data.slug}`} aria-current="page">
                      {data.name}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumbs;
