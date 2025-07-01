"use client";

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { fixImageUrl } from "@/utils/helpers";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);
  const [agreed, setAgreed] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Helper: unique key for cart item (based on id + sorted attributes)
  const getCartItemKey = (item) => {
    const attr = item.attributes
      ? Object.entries(item.attributes)
          .sort()
          .map(([k, v]) => `${k}:${v}`)
          .join("|")
      : "";
    return `${item.id}-${attr}`;
  };

  // Group cart items by brand name or merchant shop name or Unknown
  const groupedByBrand = useMemo(() => {
    const groups = {};
    cartItems.forEach((item) => {
      const brand =
        item.brand?.name || item.merchant?.shop_name || "Unknown Brand";
      if (!groups[brand]) groups[brand] = [];
      groups[brand].push(item);
    });
    return groups;
  }, [cartItems]);

  // Is single item selected?
  const isItemSelected = (item) => selectedItems.includes(getCartItemKey(item));

  // Toggle single item selection
  const handleSelect = (item) => {
    const key = getCartItemKey(item);
    if (isItemSelected(item)) {
      setSelectedItems((prev) => prev.filter((k) => k !== key));
    } else {
      setSelectedItems((prev) => [...prev, key]);
    }
  };

  // Toggle all items in a brand group
  const handleSelectBrand = (brand) => {
    const brandItems = groupedByBrand[brand];
    const brandKeys = brandItems.map(getCartItemKey);
    const allSelected = brandKeys.every((k) => selectedItems.includes(k));
    if (allSelected) {
      // Remove all brand items from selection
      setSelectedItems((prev) => prev.filter((k) => !brandKeys.includes(k)));
    } else {
      // Add all brand items to selection (avoid duplicates)
      setSelectedItems((prev) => [...new Set([...prev, ...brandKeys])]);
    }
  };

  // Select All / Unselect All toggle
  const handleToggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(getCartItemKey));
    }
  };

  // Checkbox left of "Select All" button
  const isAllSelected =
    selectedItems.length === cartItems.length && cartItems.length > 0;

  // Clear All selected items
  const handleClearAll = () => {
    setSelectedItems([]);
  };

  // Remove single item from cart
  const handleRemove = (item) => {
    dispatch(
      removeFromCart({ id: item.id, attributes: item.attributes || {} })
    );
    setSelectedItems((prev) => prev.filter((k) => k !== getCartItemKey(item)));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is emply");
  };

  // Update quantity of an item
  const handleQuantityChange = (cartItemId, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ cartItemId, quantity: newQty }));
  };

  // Total price of selected items
  const totalPrice = cartItems
    .filter((item) => isItemSelected(item))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
          <p>Add some products to your cart first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row w-full gap-10">
          <div className="md:w-2/3 space-y-6">
            <div className="card border-0 bg-base-100 ">
              <div className="card-body">
                {/* Select All Checkbox + Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <h4 className="mb-0 lg:text-3xl text-lg font-semibold">
                    My Cart ({totalQuantity})
                  </h4>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleToggleSelectAll}
                        className="cursor-pointer checkbox checked:border-[#00A788] checked:bg-[#00A788] checked:text-white"
                      />
                      <button
                        onClick={handleToggleSelectAll}
                        className="py-2 rounded text-neutral-600"
                      >
                        {isAllSelected ? "Unselect All" : "Select All"}
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={handleClearAll}
                        className="py-2 rounded text-neutral-600"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body pt-0 pr-0">
                {/* Cart Items Grouped by Brand */}
                <div className="space-y-8">
                  {Object.entries(groupedByBrand).map(([brand, items]) => {
                    const brandKeys = items.map(getCartItemKey);
                    const brandSelected = brandKeys.every((key) =>
                      selectedItems.includes(key)
                    );

                    return (
                      <div key={brand}>
                        {/* Brand Title with Checkbox */}
                        <div className="flex items-center mb-4 bg-gray-100 py-2 px-3 ">
                          <input
                            type="checkbox"
                            checked={brandSelected}
                            onChange={() => handleSelectBrand(brand)}
                            className="mr-2 cursor-pointer checkbox-md checkbox checked:border-[#00A788] checked:bg-[#00A788] checked:text-white"
                          />
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 10.5V15.5C3 18.3284 3 19.7426 3.87868 20.6213C4.75736 21.5 6.17157 21.5 9 21.5H15C17.8284 21.5 19.2426 21.5 20.1213 20.6213C21 19.7426 21 18.3284 21 15.5V10.5"
                              stroke="#64748B"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M15 17C14.3159 17.6072 13.2268 18 12 18C10.7732 18 9.68409 17.6072 9 17"
                              stroke="#64748B"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M2.91199 5.23509L2.19806 5.0053H2.19806L2.91199 5.23509ZM2.22827 7.35933L2.94219 7.58912L2.22827 7.35933ZM21.088 5.23509L20.3741 5.46488V5.46488L21.088 5.23509ZM21.7717 7.35933L22.4857 7.12954L21.7717 7.35933ZM9.65635 9.77316C9.36534 9.47841 8.89047 9.47538 8.59572 9.7664C8.30096 10.0574 8.29793 10.5323 8.58895 10.827L9.65635 9.77316ZM15.4112 9.77261C15.1202 9.47778 14.6454 9.47464 14.3505 9.76559C14.0557 10.0565 14.0526 10.5314 14.3435 10.8262L15.4112 9.77261ZM2.37533 9.57004L2.98333 9.13091L2.98333 9.13091L2.37533 9.57004ZM10.8727 8.68818C10.9766 8.28722 10.7358 7.87792 10.3349 7.77399C9.9339 7.67006 9.52461 7.91085 9.42068 8.31182L10.8727 8.68818ZM16.6267 8.68818C16.7306 8.28722 16.4899 7.87792 16.0889 7.77399C15.6879 7.67006 15.2786 7.91085 15.1747 8.31182L16.6267 8.68818ZM21.6247 9.57004L21.0167 9.13091V9.13091L21.6247 9.57004ZM21.9735 8.70667L21.2325 8.59103V8.59103L21.9735 8.70667ZM2.0265 8.70667L1.28547 8.82231L2.0265 8.70667ZM4.05507 2.87752L3.60645 2.27649L3.60645 2.27649L4.05507 2.87752ZM2.91199 5.23509L2.19806 5.0053L1.51434 7.12954L2.22827 7.35933L2.94219 7.58912L3.62592 5.46488L2.91199 5.23509ZM21.088 5.23509L20.3741 5.46488L21.0578 7.58912L21.7717 7.35933L22.4857 7.12954L21.8019 5.0053L21.088 5.23509ZM6.57622 2.5V3.25H17.4238V2.5V1.75H6.57622V2.5ZM11.9993 11.5V10.75C11.0804 10.75 10.2518 10.3762 9.65635 9.77316L9.12265 10.3001L8.58895 10.827C9.45574 11.705 10.6646 12.25 11.9993 12.25V11.5ZM17.7547 11.5V10.75C16.8355 10.75 16.0066 10.376 15.4112 9.77261L14.8774 10.2994L14.3435 10.8262C15.2104 11.7046 16.4196 12.25 17.7547 12.25V11.5ZM6.2453 11.5V10.75C5.01112 10.75 3.67028 10.082 2.98333 9.13091L2.37533 9.57004L1.76733 10.0092C2.75148 11.3718 4.55603 12.25 6.2453 12.25V11.5ZM10.1467 8.5L9.42068 8.31182C9.05796 9.71116 7.77553 10.75 6.2453 10.75V11.5V12.25C8.46912 12.25 10.341 10.7393 10.8727 8.68818L10.1467 8.5ZM15.9007 8.5L15.1747 8.31182C14.812 9.71116 13.5296 10.75 11.9993 10.75V11.5V12.25C14.2231 12.25 16.0951 10.7393 16.6267 8.68818L15.9007 8.5ZM21.6247 9.57004L21.0167 9.13091C20.3297 10.082 18.9889 10.75 17.7547 10.75V11.5V12.25C19.444 12.25 21.2485 11.3718 22.2327 10.0092L21.6247 9.57004ZM21.7717 7.35933L21.0578 7.58912C21.2449 8.1704 21.2777 8.30138 21.2325 8.59103L21.9735 8.70667L22.7145 8.82231C22.8208 8.1415 22.6686 7.69774 22.4857 7.12954L21.7717 7.35933ZM21.6247 9.57004L22.2327 10.0092C22.3174 9.89189 22.4327 9.73648 22.5243 9.53046C22.617 9.32192 22.6717 9.09674 22.7145 8.82231L21.9735 8.70667L21.2325 8.59103C21.1996 8.80184 21.1709 8.88229 21.1536 8.92111C21.1353 8.96244 21.114 8.99609 21.0167 9.13091L21.6247 9.57004ZM21.088 5.23509L21.8019 5.0053C21.5947 4.36137 21.4214 3.81957 21.2309 3.39553C21.0333 2.95545 20.7871 2.57024 20.3936 2.27649L19.9449 2.87752L19.4963 3.47854C19.6085 3.56231 19.7215 3.69586 19.8627 4.01018C20.0111 4.34054 20.1565 4.78877 20.3741 5.46488L21.088 5.23509ZM17.4238 2.5V3.25C18.1135 3.25 18.5655 3.25121 18.9105 3.292C19.2346 3.33033 19.3863 3.39642 19.4963 3.47854L19.9449 2.87752L20.3936 2.27649C19.9978 1.9811 19.5607 1.85843 19.0866 1.80238C18.6333 1.74879 18.0777 1.75 17.4238 1.75V2.5ZM2.22827 7.35933L1.51434 7.12954C1.33145 7.69774 1.17923 8.1415 1.28547 8.82231L2.0265 8.70667L2.76753 8.59103C2.72233 8.30137 2.7551 8.1704 2.94219 7.58912L2.22827 7.35933ZM2.37533 9.57004L2.98333 9.13091C2.88596 8.99609 2.86474 8.96244 2.84636 8.92111C2.82911 8.88229 2.80043 8.80184 2.76753 8.59103L2.0265 8.70667L1.28547 8.82231C1.3283 9.09674 1.383 9.32192 1.47571 9.53046C1.5673 9.73648 1.68263 9.89189 1.76733 10.0092L2.37533 9.57004ZM2.91199 5.23509L3.62592 5.46488C3.84354 4.78877 3.98895 4.34054 4.13735 4.01018C4.27854 3.69586 4.39148 3.56231 4.5037 3.47854L4.05507 2.87752L3.60645 2.27649C3.21291 2.57024 2.96674 2.95545 2.76906 3.39553C2.57858 3.81957 2.40532 4.36137 2.19806 5.0053L2.91199 5.23509ZM6.57622 2.5V1.75C5.9223 1.75 5.36666 1.74879 4.9134 1.80238C4.43932 1.85843 4.00218 1.9811 3.60645 2.27649L4.05507 2.87752L4.5037 3.47854C4.61373 3.39642 4.76536 3.33033 5.08952 3.292C5.43449 3.25121 5.88655 3.25 6.57622 3.25V2.5Z"
                              fill="#64748B"
                            />
                          </svg>

                          <h3 className="text-md uppercase ml-1 text-neutral-700">
                            {brand}
                          </h3>
                        </div>

                        {/* Items under this brand */}
                        <div className="space-y-6">
                          {items.map((item) => {
                            const selected = isItemSelected(item);
                            const key = getCartItemKey(item);

                            console.log("Raw image URL from API:", item.thumbnail);
                            console.log("Fixed image URL:", fixImageUrl(item.thumbnail));


                            return (
                              <div
                                key={key}
                                className={`flex items-top border-0 rounded-md p-4 ${
                                  selected ? "bg-gray-50" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  className="mr-3 cursor-pointer checkbox checkbox-sm checked:border-[#00A788] checked:bg-[#00A788] checked:text-white"
                                  checked={selected}
                                  onChange={() => handleSelect(item)}
                                />

                                <img
                                  src={fixImageUrl(item.thumbnail)}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1 ml-4 flex flex-col gap-2 justify-between">
                                  <h3 className="font-semibold text-md text-neutral-900 mb-0">
                                    {item.name}
                                  </h3>
                                  {item.attributes && (
                                    <div className="text-sm text-neutral-600">
                                      {Object.entries(item.attributes).map(
                                        ([attr, val]) => (
                                          <span key={attr} className="mr-3">
                                            {attr}: {val}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )}

                                  <p className="mt-1 text-start lg:hidden">
                                    <span className="text-neutral-900 text-sm font-bold ">
                                      ৳ {item?.price}
                                    </span>
                                    <span className="ml-2 line-through text-neutral-600 text-sm">
                                      ৳ {item?.regular_price}
                                    </span>
                                  </p>

                                  <div className="flex align-center">
                                    <div className="flex items-center space-x-2">
                                      <div className="border border-gray-300 rounded-full flex items-center justify-between gap-2 w-32 p-0.5">
                                        <button
                                          onClick={() =>
                                            handleQuantityChange(
                                              item.cartItemId || item.id,
                                              item.quantity - 1
                                            )
                                          }
                                          className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold text-md rounded-full cursor-pointer"
                                        >
                                          −
                                        </button>
                                        <span className="w-8 text-center font-semibold">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleQuantityChange(
                                              item.cartItemId || item.id,
                                              item.quantity + 1
                                            )
                                          }
                                          className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold text-md rounded-full cursor-pointer"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleRemove(item)}
                                      className="ml-6 text-neutral-400 hover:text-gray-600 font-bold transition duration-200 cursor-pointer"
                                      title="Remove item"
                                    >
                                      <FaRegTrashAlt />
                                    </button>
                                  </div>
                                </div>
                                <p className="mt-1 text-end hidden lg:block">
                                  <span className="text-neutral-900 text-lg font-bold ">
                                    ৳ {item?.price}
                                  </span>
                                  <span className="ml-2 line-through text-neutral-600 text-sm">
                                    ৳ {item?.regular_price}
                                  </span>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Panel (unchanged) */}
          <div className="md:w-1/3 space-y-6">
            <div className="card card-border bg-base-100 ">
              <div className="card-body">
                <div className="">
                  <h2 className="text-xl font-semibold mb-2 text-lg">
                    Order Summary
                  </h2>
                  <div className="flex justify-between mb-[12px]">
                    <p className="text-lg text-neutral-600">
                      Price ({selectedItems.length} items)
                    </p>
                    <p className="text-lg  text-right text-neutral-900">
                      ৳ {totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between mb-[12px]">
                    <p className="text-lg text-neutral-600">Shipping Fee</p>
                    <p className="text-base text-right text-[#3B82F6]">
                      To be added
                    </p>
                  </div>

                  <div className="flex items-center mb-[12px]">
                    <input
                      type="text"
                      placeholder="Store / Falcon coupon"
                      className="w-3/4 p-2 border border-gray-300 rounded border-neutral-100 "
                    />
                    <button className="btn btn-md bg-[#00A788] text-white w-1/4 border-[#00A788] ">
                      Apply
                    </button>
                  </div>

                  <div className="flex justify-between w-full mb-[12px]">
                    <p className="text-xl font-medium text-neutral-700">
                      Subtotal
                    </p>
                    <p className="text-xl font-medium text-right text-neutral-900">
                      ৳{totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-top mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mr-2 checkbox checked:border-[#00A788] checked:bg-[#00A788] checked:text-white"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I have read and agree to the Terms and Conditions, Privacy
                      Policy and Refund and Return Policy
                    </label>
                  </div>

                  <Link
                    href="/thankyou"
                    disabled={selectedItems.length === 0 || !agreed}
                    className={`btn border-0 px-6 py-2 rounded text-white w-full ${
                      selectedItems.length === 0 || !agreed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#00A788] hover:bg-[#00A788]"
                    }`}
                    onClick={() => handleClearCart()}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
