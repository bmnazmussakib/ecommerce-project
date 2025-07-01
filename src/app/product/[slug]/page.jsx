"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductBySlug } from "@/lib/api";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import StarRatings from "react-star-ratings";

import BreadCrumbs from "@/components/BreadCrumbs";
import DescriptionToggle from "@/components/DescriptionToggle";

// Skeletons
import ProductSliderSkeleton from "@/components/skeleton/ProductSliderSkeleton";
import ProductInfoSkeleton from "@/components/skeleton/ProductInfoSkeleton";
import DeliverySkeleton from "@/components/skeleton/DeliverySkeleton";
import DescriptionSkeleton from "@/components/skeleton/DescriptionSkeleton";
import SpecificationSkeleton from "@/components/skeleton/SpecificationSkeleton";
import SpecificationToggle from "@/components/SpecificationToggle";
import { fixImageUrl } from "@/utils/helpers";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      if (slug) {
        const data = await fetchProductBySlug(slug);
        setProduct(data);
        setSelectedImage(data?.thumbnail);
      }
    };
    getProduct();
  }, [slug]);

  const attributeOptions = {};
  product?.variations?.forEach((variation) => {
    variation.variation_attributes?.forEach((attr) => {
      const attrName = attr.attribute.name;
      const attrValue = attr.attribute_option.attribute_value;
      if (!attributeOptions[attrName]) {
        attributeOptions[attrName] = new Set();
      }
      attributeOptions[attrName].add(attrValue);
    });
  });

  const handleAttributeSelect = (attrName, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrName]: value,
    }));
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity,
      price: Number(product.product_detail?.discount_price),
      regular_price: Number(product.product_detail?.regular_price),
      promotion: "Min. spend ৳ 500",
      ...(product.is_variant && { attributes: selectedAttributes }),
      brand: {
        id: product.brand?.id || null,
        name: product.brand?.name || "Unknown",
        slug: product.brand?.slug || "",
      },
      merchant: {
        ...product.merchant,
        shop_name: product.merchant?.shop_name || "Unknown",
      },
    };

    dispatch(addToCart(cartItem));
    toast.success(`${product.name} added to cart!`);
  };

  const isAllVariantsSelected =
    product?.is_variant &&
    Object.keys(attributeOptions).length ===
      Object.keys(selectedAttributes).length;

  const canAddToCart =
    product && (!product.is_variant || isAllVariantsSelected);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white">
          <div className="max-w-screen-2xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ProductSliderSkeleton />
              </div>
              <div className="lg:col-span-1">
                <ProductInfoSkeleton />
              </div>
              <div className="lg:col-span-1 flex flex-col gap-4">
                <DeliverySkeleton/>
                <DeliverySkeleton />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 py-8">
          <DescriptionSkeleton />
          <SpecificationSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadCrumbs data={product} />

      <div className="min-h-screen bg-gray-100">
        <div className="bg-white">
          <div className="max-w-screen-2xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image Gallery */}
              <div className="lg:col-span-1">
                <div className="max-w-md aspect-square">
                  <ImageGallery
                    items={[
                      {
                        original: fixImageUrl(product.thumbnail),
                        thumbnail: fixImageUrl(product.thumbnail),
                      },
                      ...(product.variations
                        ?.filter((v) => v.image)
                        .map((v) => ({
                          original: v.image,
                          thumbnail: v.image,
                        })) || []),
                    ]}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showNav={false}
                    thumbnailPosition="bottom"
                    additionalClass="custom-gallery rounded-md"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-1 space-y-4">
                <h1 className="text-xl font-semibold text-neutral-900">{product.name}</h1>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {product.rating?.toFixed(1) || "0.0"}{" "}
                      {product.total_reviews ? `(${product.total_reviews} reviews)` : ""}
                    </span>
                    <StarRatings
                      rating={Number(product.rating) || 0}
                      starRatedColor="#00A788"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      name="rating"
                    />
                  </div>
                </div>

                <div className="text-xl text-[#00A788] flex items-center">
                  <span className="font-semibold mr-2">
                    ৳ {product.product_detail?.discount_price}
                  </span>
                  <span className="ml-2 line-through text-gray-400 text-sm">
                    ৳ {product.product_detail?.regular_price}
                  </span>
                </div>

                {/* Variant Options */}
                {product.is_variant &&
                  Object.entries(attributeOptions).map(([attrName, values]) => (
                    <div key={attrName}>
                      <p className="text-sm font-medium text-gray-700 mb-1">{attrName}:</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[...values].map((value) => (
                          <button
                            key={value}
                            onClick={() => handleAttributeSelect(attrName, value)}
                            className={`px-3 py-1 rounded-md border text-sm hover:border-[#00A788] cursor-pointer ${
                              selectedAttributes[attrName] === value
                                ? "bg-[#00A788] text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                {/* Quantity Control */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="border border-gray-300 rounded-full flex items-center justify-between gap-2 w-32 p-0.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold rounded-full"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`lg:w-100 w-full mt-4 px-4 py-2 font-medium rounded-md transition duration-200 ${
                    canAddToCart
                      ? "bg-[#00A788] text-white hover:bg-[#00A788]"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!canAddToCart}
                >
                  Add to Cart
                </button>
              </div>

              {/* Seller & Delivery */}
              <div className="lg:col-span-1 space-y-4">
                <div className="card card-border border-neutral-200 bg-base-100 rounded-5xl">
                  <div className="card-body">
                    <h2 className="text-lg font-semibold mb-2">
                      Delivery Options
                    </h2>
                    <ul className="text-sm text-gray-700 space-y-4">
                      <li>
                        <div className="flex align-top gap-2">
                          <div className="icon">
                            <img src="/images/regular-delivery.svg" alt="" />
                          </div>
                          <div className="content">
                            <h5 className="text-lg font-medium leading-none mb-2">
                              Regular
                            </h5>
                            <p>Delivery within 2-3 days</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex align-top gap-2">
                          <div className="icon text-neutral-300">
                            <img src="/images/express-delivery.svg" alt="" />
                          </div>
                          <div className="content">
                            <div className="flex align-center gap-2 mb-2">
                              <h5 className="text-lg font-medium leading-none mb-0   text-neutral-300">
                                Express
                              </h5>
                              <p className="text-sm font-medium leading-none  mb-0 text-rose-400">
                                Not Available
                              </p>
                            </div>
                            <p className="text-neutral-300">
                              Delivery within 24 Hours.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card card-border border-neutral-200 bg-base-100 rounded-5xl">
                  <div className="card-body">
                    <h2 className="text-sm font-normal mb-2">Sold By</h2>
                    <div className="flex items-center gap-3">
                      <div className="image">
                        <img src="/images/merchange-logo.png" alt="" />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-gray-800 font-medium">
                          <span className="flex items-center gap-1">
                            {product.merchant?.shop_name || "Unknown"}
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.9658 8.94894L16.8325 7.63226C16.6158 7.38226 16.4408 6.9156 16.4408 6.58226V5.1656C16.4408 4.28226 15.7158 3.55726 14.8325 3.55726H13.4158C13.0908 3.55726 12.6158 3.38226 12.3658 3.1656L11.0491 2.03226C10.4741 1.5406 9.53246 1.5406 8.94912 2.03226L7.64076 3.17393C7.39076 3.38226 6.91576 3.55726 6.59076 3.55726H5.14909C4.26576 3.55726 3.54076 4.28226 3.54076 5.1656V6.5906C3.54076 6.9156 3.36576 7.38226 3.15742 7.63226L2.03242 8.95727C1.54909 9.53227 1.54909 10.4656 2.03242 11.0406L3.15742 12.3656C3.36576 12.6156 3.54076 13.0823 3.54076 13.4073V14.8323C3.54076 15.7156 4.26576 16.4406 5.14909 16.4406H6.59076C6.91576 16.4406 7.39076 16.6156 7.64076 16.8323L8.95746 17.9656C9.53246 18.4573 10.4741 18.4573 11.0575 17.9656L12.3741 16.8323C12.6241 16.6156 13.0908 16.4406 13.4241 16.4406H14.8408C15.7241 16.4406 16.4491 15.7156 16.4491 14.8323V13.4156C16.4491 13.0906 16.6241 12.6156 16.8408 12.3656L17.9741 11.0489C18.4575 10.4739 18.4575 9.52394 17.9658 8.94894ZM13.4658 8.42394L9.44079 12.4489C9.32412 12.5656 9.16579 12.6323 8.99912 12.6323C8.83246 12.6323 8.67412 12.5656 8.55746 12.4489L6.54076 10.4323C6.29909 10.1906 6.29909 9.79061 6.54076 9.54894C6.78242 9.30727 7.18242 9.30727 7.42409 9.54894L8.99912 11.1239L12.5825 7.5406C12.8241 7.29893 13.2241 7.29893 13.4658 7.5406C13.7075 7.78226 13.7075 8.18226 13.4658 8.42394Z"
                                fill="#3B82F6"
                              />
                            </svg>
                          </span>
                        </p>
                        <img src="/images/risign-star.png" alt="" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3 border-b border-neutral-200 pb-3">
                      <button className="flex-1 px-3 py-1 bg-[#E6F8F4] text-[#00A788] hover:text-gray-100 rounded hover:bg-[#00A788] font-medium transition duration-200">
                        Chat Now
                      </button>
                      <button className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-300 font-medium transition duration-200">
                        View Shop
                      </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-center mt-2">
                      <div className="text-left lg:text-center">
                        <p className="text-neutral-600 text-base font-medium">
                          Ship on Time
                        </p>
                        <p className="text-neutral-500 text-3xl ">100%</p>
                      </div>
                      <div className="text-left lg:text-center">
                        <p className="text-neutral-600 text-base font-medium">
                          Chat Response
                        </p>
                        <p className="text-neutral-500 text-3xl ">90%</p>
                      </div>
                      <div className="text-left lg:text-center">
                        <p className="text-neutral-600 text-base font-medium">
                          Shop Rating
                        </p>
                        <p className="text-neutral-500 text-3xl ">99.8%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="max-w-screen-2xl mx-auto px-4 py-8">
          <DescriptionToggle data={product.description} />
          <SpecificationToggle data={product}/>
        </div>
      </div>
    </>
  );
}
