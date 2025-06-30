"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductBySlug } from "@/lib/api";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import default styles
import StarRatings from "react-star-ratings";
import BreadCrumbs from "@/components/BreadCrumbs";
import parse from 'html-react-parser';



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

    console.log("Product Details:", product);

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
            id: product.id,
            slug: product.slug,
            name: product.name,
            thumbnail: product.thumbnail,
            price: Number(product.product_detail?.discount_price),
            regular_price: Number(product.product_detail?.regular_price),
            quantity,
            sku: product.sku,
            barcode: product.barcode,
            total_stock_qty: product.total_stock_qty,
            merchant: {
                shop_name: product.merchant?.shop_name || "Unknown",
            },
            promotion: "Min. spend ৳ 500", // hardcoded based on UI; update if dynamic
            ...(product.is_variant && { attributes: selectedAttributes }),
        };

        console.log('added to cart!: ',cartItem)

        dispatch(addToCart(cartItem));
        toast.success(`${product.name} added to cart!`);
    };


    const isAllVariantsSelected =
        product?.is_variant &&
        Object.keys(attributeOptions).length ===
        Object.keys(selectedAttributes).length;

    const canAddToCart = product && (!product.is_variant || isAllVariantsSelected);

    if (!product) return <div className="p-10 text-center">Loading...</div>;

    return (
        <>
            <BreadCrumbs />
            <div className="min-h-screen bg-gray-100">
                <div className=" bg-white">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                            <div className="lg:col-span-1">
                                <div className="max-w-md aspect-square ">
                                    <ImageGallery
                                        items={[
                                            {
                                                original: product.thumbnail,
                                                thumbnail: product.thumbnail,
                                            },
                                            ...(product.variations?.filter((v) => v.image).map((v) => ({
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
                                <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>

                                <div className="flex justify-between">
                                    {/* Star Ratings */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600 ">
                                            {product.rating ? product.rating.toFixed(1) : "0.0"}
                                            {product.total_reviews ? ` (${product.total_reviews} reviews)` : ""}
                                        </span>
                                        <StarRatings
                                            rating={Number(product.rating) || 0} // assuming product.rating is a number like 4.5
                                            starRatedColor="#00A788"
                                            numberOfStars={5}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            name="rating"
                                        />

                                    </div>

                                    <div className="flex">
                                        <button className="btn btn-ghost btn-sm px-2 hover:bg-transparent border-0">
                                            <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M23.3282 2.99269C19.9761 0.936536 17.0505 1.76514 15.2929 3.08502C14.5723 3.6262 14.212 3.89679 14 3.89679C13.788 3.89679 13.4277 3.6262 12.7071 3.08502L12.7071 3.08502C10.9495 1.76514 8.02386 0.936536 4.6718 2.99269C0.272586 5.69117 -0.722849 14.5936 9.42441 22.1042C11.3571 23.5347 12.3235 24.25 14 24.25C15.6765 24.25 16.6429 23.5347 18.5756 22.1042C28.7228 14.5936 27.7274 5.69117 23.3282 2.99269Z" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-ghost btn-sm px-0 hover:bg-transparent border-0">
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M35.25 17.125C35.25 19.1961 33.5711 20.875 31.5 20.875C29.4289 20.875 27.75 19.1961 27.75 17.125C27.75 15.0539 29.4289 13.375 31.5 13.375C33.5711 13.375 35.25 15.0539 35.25 17.125Z" stroke="#64748B" stroke-width="1.8" />
                                                <path d="M20.25 24C20.25 26.0711 18.5711 27.75 16.5 27.75C14.4289 27.75 12.75 26.0711 12.75 24C12.75 21.9289 14.4289 20.25 16.5 20.25C18.5711 20.25 20.25 21.9289 20.25 24Z" stroke="#64748B" stroke-width="1.8" />
                                                <path d="M35.25 30.875C35.25 32.9461 33.5711 34.625 31.5 34.625C29.4289 34.625 27.75 32.9461 27.75 30.875C27.75 28.8039 29.4289 27.125 31.5 27.125C33.5711 27.125 35.25 28.8039 35.25 30.875Z" stroke="#64748B" stroke-width="1.8" />
                                                <path d="M19.9106 22.4372L28.0356 18.6879M19.9106 25.5629L28.0356 29.3122" stroke="#64748B" stroke-width="1.8" />
                                            </svg>

                                        </button>
                                    </div>

                                </div>

                                {/* Price */}
                                <div className="text-xl text-[#00A788] flex items-center">
                                    <span className="font-semibold mr-2">
                                        ৳ {product.product_detail?.discount_price}
                                    </span>
                                    <span className="ml-2 line-through text-gray-400 text-sm">
                                        ৳ {product.product_detail?.regular_price}
                                    </span>
                                </div>

                                {/* Promotion */}
                                <div className="flex items-center gap-2">
                                    <p className="mb-0 font-medium text-neutral-600 text-sm capitalize leading-0">promotion</p>

                                    <div className=" text-sm font-semibold flex ">
                                        <div className="relative inline-block">
                                            <svg width="154" height="25" viewBox="0 0 154 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M154 0L0 0L0 25L154 25L143.043 12.7119L154 0Z" fill="url(#paint0_linear_1_786)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_1_786" x1="17.0435" y1="12.7119" x2="172.87" y2="12.7119" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#FF8810" />
                                                        <stop offset="1" stop-color="#D23707" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 w-full text-gray-100">
                                                Min. spend ৳ 500
                                            </span>
                                        </div>
                                    </div>

                                </div>




                                {/* Variants */}
                                {product.is_variant &&
                                    Object.entries(attributeOptions).map(([attrName, values]) => (
                                        <div key={attrName}>
                                            <p className="text-sm font-medium text-gray-700 mb-1">{attrName}:</p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {[...values].map((value) => (
                                                    <button
                                                        key={value}
                                                        onClick={() => handleAttributeSelect(attrName, value)}
                                                        className={`px-3 py-1 rounded-md border text-sm hover:border-[#00A788] cursor-pointer ${selectedAttributes[attrName] === value
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

                                {/* Quantity */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                    <div className="border border-gray-300 rounded-full flex items-center justify-between gap-2 w-32 p-0.5">
                                        <button
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold rounded-full cursor-pointer"
                                        >
                                            −
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold rounded-full cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`w-100 mt-4 px-4 py-2 font-medium rounded-md transition duration-200 cursor-pointer ${canAddToCart
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
                                        <h2 className="text-lg font-semibold mb-2">Delivery Options</h2>
                                        <ul className="text-sm text-gray-700 space-y-4">
                                            <li>
                                                <div className="flex align-top gap-2">
                                                    <div className="icon">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 22.0001C11.1818 22.0001 10.4002 21.6699 8.83693 21.0096C4.94564 19.3658 3 18.5439 3 17.1614C3 16.7743 3 10.0646 3 7.00012M12 22.0001C12.8182 22.0001 13.5998 21.6699 15.1631 21.0096C19.0544 19.3658 21 18.5439 21 17.1614V7.00012M12 22.0001V11.3549" stroke="#00B795" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M8.32592 9.69126L5.40472 8.27773C3.80157 7.50198 3 7.11411 3 6.49988C3 5.88565 3.80157 5.49778 5.40472 4.72203L8.32592 3.3085C10.1288 2.43609 11.0303 1.99988 12 1.99988C12.9697 1.99988 13.8712 2.43608 15.6741 3.3085L18.5953 4.72203C20.1984 5.49778 21 5.88565 21 6.49988C21 7.11411 20.1984 7.50198 18.5953 8.27773L15.6741 9.69126C13.8712 10.5637 12.9697 10.9999 12 10.9999C11.0303 10.9999 10.1288 10.5637 8.32592 9.69126Z" stroke="#00B795" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M6 12L8 13" stroke="#00B795" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M17.002 4.00012L7.00195 9.00012" stroke="#00B795" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>

                                                    </div>
                                                    <div className="content">
                                                        <h5 className="text-lg font-medium leading-none mb-2">Regular</h5>
                                                        <p>Delivery within 2-3 days</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex align-top gap-2">
                                                    <div className="icon text-neutral-300">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.998 21.9999C12.1798 21.9999 11.3982 21.6587 9.83496 20.9763C8.01038 20.1799 6.61359 19.5702 5.64453 18.9999H1.99805M12.998 21.9999C13.8162 21.9999 14.5978 21.6587 16.1611 20.9763C20.0524 19.2778 21.998 18.4285 21.998 16.9999V6.49988M12.998 21.9999V10.9999M3.99805 6.49988V9.49988" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M9.32787 9.69126L6.40667 8.27773C4.80352 7.50198 4.00195 7.11411 4.00195 6.49988C4.00195 5.88565 4.80352 5.49778 6.40667 4.72203L9.32787 3.3085C11.1308 2.43609 12.0323 1.99988 13.002 1.99988C13.9717 1.99988 14.8732 2.43608 16.6761 3.3085L19.5973 4.72203C21.2004 5.49778 22.002 5.88565 22.002 6.49988C22.002 7.11411 21.2004 7.50198 19.5973 8.27773L16.6761 9.69126C14.8732 10.5637 13.9717 10.9999 13.002 10.9999C12.0323 10.9999 11.1308 10.5637 9.32787 9.69126Z" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M18.1386 4.0155L7.86914 8.98472" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M1.99805 13.0001H4.99805" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M1.99805 16.0001H4.99805" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="content">
                                                        <div className="flex align-center gap-2 mb-2">
                                                            <h5 className="text-lg font-medium leading-none mb-0   text-neutral-300">Express</h5>
                                                            <p className="text-sm font-medium leading-none  mb-0 text-rose-400">Not Available</p>
                                                        </div>
                                                        <p className="text-neutral-300">Delivery within 24 Hours.</p>
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
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.9658 8.94894L16.8325 7.63226C16.6158 7.38226 16.4408 6.9156 16.4408 6.58226V5.1656C16.4408 4.28226 15.7158 3.55726 14.8325 3.55726H13.4158C13.0908 3.55726 12.6158 3.38226 12.3658 3.1656L11.0491 2.03226C10.4741 1.5406 9.53246 1.5406 8.94912 2.03226L7.64076 3.17393C7.39076 3.38226 6.91576 3.55726 6.59076 3.55726H5.14909C4.26576 3.55726 3.54076 4.28226 3.54076 5.1656V6.5906C3.54076 6.9156 3.36576 7.38226 3.15742 7.63226L2.03242 8.95727C1.54909 9.53227 1.54909 10.4656 2.03242 11.0406L3.15742 12.3656C3.36576 12.6156 3.54076 13.0823 3.54076 13.4073V14.8323C3.54076 15.7156 4.26576 16.4406 5.14909 16.4406H6.59076C6.91576 16.4406 7.39076 16.6156 7.64076 16.8323L8.95746 17.9656C9.53246 18.4573 10.4741 18.4573 11.0575 17.9656L12.3741 16.8323C12.6241 16.6156 13.0908 16.4406 13.4241 16.4406H14.8408C15.7241 16.4406 16.4491 15.7156 16.4491 14.8323V13.4156C16.4491 13.0906 16.6241 12.6156 16.8408 12.3656L17.9741 11.0489C18.4575 10.4739 18.4575 9.52394 17.9658 8.94894ZM13.4658 8.42394L9.44079 12.4489C9.32412 12.5656 9.16579 12.6323 8.99912 12.6323C8.83246 12.6323 8.67412 12.5656 8.55746 12.4489L6.54076 10.4323C6.29909 10.1906 6.29909 9.79061 6.54076 9.54894C6.78242 9.30727 7.18242 9.30727 7.42409 9.54894L8.99912 11.1239L12.5825 7.5406C12.8241 7.29893 13.2241 7.29893 13.4658 7.5406C13.7075 7.78226 13.7075 8.18226 13.4658 8.42394Z" fill="#3B82F6" />
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

                                        <div className="flex justify-between items-center mt-2">
                                            <div>
                                                <p className="text-neutral-600 text-base font-medium">Ship on Time</p>
                                                <p className="text-neutral-500 text-3xl">100%</p>
                                            </div>
                                            <div>
                                                <p className="text-neutral-600 text-base font-medium">Chat Response</p>
                                                <p className="text-neutral-500 text-3xl">90%</p>
                                            </div>
                                            <div>
                                                <p className="text-neutral-600 text-base font-medium">Shop Rating</p>
                                                <p className="text-neutral-500 text-3xl">99.8%</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-2xl mx-auto mt-5">
                    <div className="card bg-base-100 card-md shadow-sm w-3/4 mb-5">
                        <div className="card-body">
                            <h3 className="text-xl font-semibold mb-3">Description</h3>
                            <p className="text-gray-700 text-sm">{parse(product.description) || "No description available."}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 card-md shadow-sm w-3/4">
                        <div className="card-body">
                            <h3 className="text-xl font-semibold mb-3">Specification</h3>
                            <h3 className="text-lg font-medium mb-3">{product.name}</h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>SKU: {product.sku}</li>
                                <li>Barcode: {product.barcode}</li>
                                <li>Stock: {product.total_stock_qty}</li>
                                <li>Regular Price: ৳ {product.product_detail?.regular_price}</li>
                                <li>Discount Price: ৳ {product.product_detail?.discount_price}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
