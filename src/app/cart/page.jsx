"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateQuantity,
    removeFromCart,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    console.log("Cart Items:", cartItems);

    const [selectedItems, setSelectedItems] = useState([]);
    const [agreed, setAgreed] = useState(false);

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

    const isItemSelected = (item) => {
        return selectedItems.includes(getCartItemKey(item));
    };

    const handleSelect = (item) => {
        const key = getCartItemKey(item);
        if (isItemSelected(item)) {
            setSelectedItems((prev) => prev.filter((k) => k !== key));
        } else {
            setSelectedItems((prev) => [...prev, key]);
        }
    };

    const handleSelectAll = () => {
        const allKeys = cartItems.map(getCartItemKey);
        setSelectedItems(allKeys);
    };

    const handleClearAll = () => {
        setSelectedItems([]);
    };

    const handleToggleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            handleClearAll();
        } else {
            handleSelectAll();
        }
    };

    const handleQuantityChange = (cartItemId, newQty) => {
        if (newQty < 1) return;
        dispatch(updateQuantity({ cartItemId, quantity: newQty }));
    };

    const handleRemove = (item) => {
        dispatch(removeFromCart({ id: item.id, attributes: item.attributes || {} }));
        setSelectedItems((prev) =>
            prev.filter((k) => k !== getCartItemKey(item))
        );
        toast.success("Item removed from cart");
    };

    const handleDeleteSelected = () => {
        const itemsToDelete = cartItems.filter((item) =>
            selectedItems.includes(getCartItemKey(item))
        );
        itemsToDelete.forEach((item) =>
            dispatch(removeFromCart({ id: item.id, attributes: item.attributes || {} }))
        );
        toast.success("Selected items removed");
        setSelectedItems([]);
    };

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
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

                <div className="flex flex-col md:flex-row w-full gap-10" >
                    <div className="md:w-2/3 space-y-6">
                        <div className="card card-border bg-base-100 ">
                            <div className="card-body">

                                {/* Select All / Clear All / Delete Selected */}
                                <div className="mb-4 flex items-center gap-4">
                                    <button
                                        onClick={handleToggleSelectAll}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        {selectedItems.length === cartItems.length
                                            ? "Unselect All"
                                            : "Select All"}
                                    </button>
                                    <button
                                        onClick={handleClearAll}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={handleDeleteSelected}
                                        disabled={selectedItems.length === 0}
                                        className={`px-4 py-2 rounded ${selectedItems.length === 0
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-red-600 text-white hover:bg-red-700"
                                            }`}
                                    >
                                        Delete Selected
                                    </button>

                                    <span className="ml-auto text-sm text-gray-600">
                                        Selected: {selectedItems.length} / {cartItems.length}
                                    </span>
                                </div>

                                {/* Cart Items */}
                                <div className="space-y-6">
                                    {cartItems.map((item) => {
                                        const selected = isItemSelected(item);
                                        const key = getCartItemKey(item);

                                        return (
                                            <div
                                                key={key}
                                                className={`flex items-top border rounded-md p-4 ${selected ? "bg-gray-50" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mr-3"
                                                    checked={selected}
                                                    onChange={() => handleSelect(item)}
                                                />

                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                                <div className="flex-1 ml-4 flex flex-col gap-1">
                                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                                    {item.attributes && (
                                                        <div className="text-sm text-gray-600">
                                                            {Object.entries(item.attributes).map(([attr, val]) => (
                                                                <span key={attr} className="mr-3">
                                                                    {attr}: <strong>{val}</strong>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
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
                                                                    className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold rounded-full cursor-pointer"
                                                                >
                                                                    −
                                                                </button>
                                                                <span className="w-8 text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            item.cartItemId || item.id,
                                                                            item.quantity + 1
                                                                        )
                                                                    }
                                                                    className="px-3 py-1 bg-neutral-100 text-neutral-500 font-bold rounded-full cursor-pointer"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemove(item)}
                                                            className="ml-6 text-gray-400 hover:text-gray-600 font-bold transition duration-200 cursor-pointer"
                                                            title="Remove item"
                                                        >
                                                            <FaRegTrashAlt />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-end">

                                                    <span className="text-gray-800 text-lg font-bold ">
                                                        ৳ {item?.price}
                                                    </span>
                                                    <span className="ml-2 line-through text-gray-400 text-sm">
                                                        ৳ {item?.regular_price}
                                                    </span>
                                                </p>



                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/3 space-y-6">
                        <div className="card card-border bg-base-100 ">
                            <div className="card-body">
                                {/* Summary & Checkout */}
                                <div className="">
                                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                                    <div className="flex justify-between">

                                    <p className="mb-1">Subtotal: ৳ {totalPrice.toFixed(2)}</p>
                                    <p className="mb-1">Subtotal: ৳ {totalPrice.toFixed(2)}</p>
                                    </div>
                                    <p className="mb-4 text-gray-500 text-sm">
                                        *Coupon & shipping calculated at checkout
                                    </p>

                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="mr-2"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-700">
                                            I agree to the Terms & Conditions
                                        </label>
                                    </div>

                                    <button
                                        disabled={selectedItems.length === 0 || !agreed}
                                        onClick={() => toast("Checkout feature coming soon!")}
                                        className={`px-6 py-2 rounded text-white ${selectedItems.length === 0 || !agreed
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-black hover:bg-gray-900"
                                            }`}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}
