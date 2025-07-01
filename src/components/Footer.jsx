import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white hidden">
        <div className="py-12 px-6">
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> */}
            <div className="flex justify-content-between items-start w-full">
              {/* Column 1: Logo & Description */}
              <div className="flex-auto">
                <div className="flex items-center mb-4">
                  <img
                    src={"/images/logo.png"}
                    alt="Falcon Logo"
                    className="h-8 mr-2"
                  />
                  <h2 className="text-2xl font-bold">FALCON</h2>
                </div>
                <p className="text-sm text-gray-300 mb-6">
                  Experience our new platform & enjoy exciting deals and offers on
                  your day-to-day.
                </p>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <div className="icon mr-2 h-8 w-8 bg-white rounded-full text-neutral-900 flex justify-center items-center">
                      <FaLocationDot />
                    </div>
                    <span className="text-wrap">
                      House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="icon mr-2 h-8 w-8 bg-white rounded-full text-neutral-900 flex justify-center items-center">
                      <FaLocationDot />
                    </div>
                    <span className="text-wrap">01729-1497201</span>
                  </li>
                  <li className="flex items-center">
                    <div className="icon mr-2 h-8 w-8 bg-white rounded-full text-neutral-900 flex justify-center items-center">
                      <FaLocationDot />
                    </div>
                    <span className="text-wrap">falcon@gmail.com</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Contact Info */}
              <div className="flex-auto">
                <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">
                  About
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      career
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      cancllation & returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      terms of use
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Quick Links */}
              <div className="flex-auto">
                <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">
                  Help
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li>
                    <a href="#" className="hover:underline">
                      payments
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      shipping
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      my orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      faq
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      terms of uses
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      security
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex-auto">
                <div>
                  <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">
                    need support?
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>
                      <button className=" btn btn-outline hover:bg-transparent hover:shadow-none">
                        <MdOutlineHeadsetMic className="text-[#00A788] text-xl" />
                        <p className="text-md mb-0 text-white">10724-7814XX</p>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">
                    download app
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div>
                      <img src="/images/google.png" alt="" className="w-[150px]" />
                    </div>
                    <div>
                      <img src="/images/apple.png" alt="" className="w-[150px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 4: Newsletter / Social Media */}
              {/* <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-300 hover:text-white"
              >
                <img
                  src="facebook-icon.png"
                  alt="Facebook"
                  className="h-6 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-300 hover:text-white"
              >
                <img
                  src="instagram-icon.png"
                  alt="Instagram"
                  className="h-6 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-300 hover:text-white"
              >
                <img src="twitter-icon.png" alt="Twitter" className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-white"
              >
                <img
                  src="linkedin-icon.png"
                  alt="LinkedIn"
                  className="h-6 w-6"
                />
              </a>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md text-black focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div> */}
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="mb-0 capitalize text-neutral-2 00">follow us on</p>
              <ul className="list-none flex gap-2">
                <li className="transition-all duration-300 hover:scale-110">
                  <Link href={'#'}>
                    <img src="/images/facebook.svg" alt="" />
                  </Link>
                </li>
                <li className="transition-all duration-300 hover:scale-110">
                  <Link href={'#'}>
                    <img src="/images/instagram.svg" alt="" />
                  </Link>
                </li>
                <li className="transition-all duration-300 hover:scale-110">
                  <Link href={'#'}>
                    <img src="/images/twitter.svg" alt="" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <p className="mb-0 uppercase text-neutral-400">paymet accepted</p>
              <div>
                <img src="/images/payment.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Cpyright */}
        <div className="border border-neutral-600 py-4">
          <p className="text-center text-sm text-white mb-0">Falcon ©2025. Design by xyz</p>
        </div>

      </footer>

      <footer className="bg-gray-900 text-white">
      <div className="py-12 px-6">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Column 1: Logo & Info */}
            <div className="md:w-1/4 flex-shrink-0">
              <div className="flex items-center mb-4">
                <img src={"/images/logo.png"} alt="Falcon Logo" className="h-8 mr-2" />
                <h2 className="text-2xl font-bold">FALCON</h2>
              </div>
              <p className="text-sm text-gray-300 mb-6">
                Experience our new platform & enjoy exciting deals and offers on your day-to-day.
              </p>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start">
                  <div className="icon mr-2 h-8 w-8 bg-white rounded-full text-neutral-900 flex justify-center items-center">
                    <FaLocationDot />
                  </div>
                  <span>
                    House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="icon mr-2 h-8 w-8 bg-white rounded-full text-neutral-900 flex justify-center items-center">
                    <FaLocationDot />
                  </div>
                  <span>01729-1497201</span>
                </li>
                <li className="flex items-center">
                  <div className="icon mr-2 h-8 w-8 bg-white rounded-full text-neutral-900 flex justify-center items-center">
                    <FaLocationDot />
                  </div>
                  <span>falcon@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Column 2: About Links */}
            <div className="md:w-1/4">
              <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">About</h3>
              <ul className="space-y-2 text-white text-sm">
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Career</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Press</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Cancellation & Returns</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Terms of Use</a></li>
              </ul>
            </div>

            {/* Column 3: Help Links */}
            <div className="md:w-1/4">
              <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">Help</h3>
              <ul className="space-y-2 text-white text-sm">
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Payments</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Shipping</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">My Orders</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Terms of Uses</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Security</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-all duration-300">Privacy</a></li>
              </ul>
            </div>

            {/* Column 4: Support & App Download */}
            <div className="md:w-1/4">
              <div>
                <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">Need Support?</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    <button className="btn btn-outline hover:bg-transparent hover:shadow-none flex items-center gap-2">
                      <MdOutlineHeadsetMic className="text-[#00A788] text-xl" />
                      <p className="text-md text-white mb-0">10724-7814XX</p>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <h3 className="text-md font-semibold mb-4 uppercase text-neutral-400">Download App</h3>
                <div className="flex flex-col gap-3">
                  <img src="/images/google.png" alt="Google Play" className="max-w-[150px]" />
                  <img src="/images/apple.png" alt="App Store" className="max-w-[150px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Payment Section */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-800 pt-6">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <p className="text-neutral-400">Follow us on</p>
              <ul className="flex gap-3">
                <li className="transition-all duration-300 hover:scale-110">
                  <Link href="#"><img src="/images/facebook.svg" alt="Facebook" /></Link>
                </li>
                <li className="transition-all duration-300 hover:scale-110">
                  <Link href="#"><img src="/images/instagram.svg" alt="Instagram" /></Link>
                </li>
                <li className="transition-all duration-300 hover:scale-110">
                  <Link href="#"><img src="/images/twitter.svg" alt="Twitter" /></Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <p className="uppercase text-neutral-400">Payment Accepted</p>
              <div>
                <img src="/images/payment.svg" alt="Payment Methods" className="max-w-[250px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border border-neutral-600 py-4">
        <p className="text-center text-sm text-white mb-0">Falcon ©{new Date().getFullYear()}. Design by XYZ</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
