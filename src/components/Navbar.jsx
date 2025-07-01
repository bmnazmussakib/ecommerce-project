"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BsBoxSeam } from "react-icons/bs";
import { PiHeadset } from "react-icons/pi";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { BiHome } from "react-icons/bi";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

// Logo SVG
const FalconLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 50"
    className="w-8 h-8"
  >
    <path d="M0 25L50 0L100 25L50 50Z" fill="#fff" />
  </svg>
);

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Ensure cart count is only rendered on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    "Electronics",
    "Home Appliances",
    "Mother & Baby",
    "Automotive",
    "Sports Gear",
  ];

  return (
    <div className="bg-gray-900 text-white w-full z-50">
      {/* Header */}
      <header className="bg-[#0F172A]">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="" className="max-w-[100px]"/>
            <span className="text-xl font-bold">FALCON</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-grow mx-4 max-w-md">
            <input
              type="text"
              placeholder="Search for anything...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-l-sm border border-r-0 focus:outline-none w-full text-black bg-gray-100 placeholder-gray-400"
            />
            <button className="bg-[#00B795] text-white px-4 py-2 rounded-r-sm">
              <BiSearchAlt size={20} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative text-2xl">
              <AiOutlineShoppingCart />
              {isClient && totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -mt-2 -mr-2">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <Link href="/profile" className="text-2xl">
              <AiOutlineUser />
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Categories + Nav */}
      <nav className="bg-white shadow">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 hidden md:flex items-center justify-between text-gray-900">
          <button className="flex items-center">
            <AiOutlineMenu className="text-2xl mr-2 text-[#00B795]" />
            <span className="text-lg">Category</span>
          </button>

          <ul className="flex space-x-6">
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-neutral-900 hover:text-[#00B795] text-md transition-colors duration-300 cursor-pointer"
              >
                {category}
              </li>
            ))}
          </ul>

          <div className="flex space-x-6 text-sm font-medium">
            <a
              href="#"
              className="text-neutral-500 hover:text-[#00B795] flex items lopen-center text-md space-x-1"
            >
              <span>
                <BsBoxSeam />
              </span>
              <span>TRACK ORDER</span>
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-[#00B795] flex items-center text-md space-x-1"
            >
              <span>
                <MdOutlineHeadsetMic />
              </span>
              <span>HELP CENTER</span>
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-[#00B795] flex items-center text-md space-x-1"
            >
              <span>
                <BiHome />
              </span>
              <span>SELL WITH US</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}