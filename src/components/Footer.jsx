import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineHeadsetMic } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & Description */}
          <div>
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
          <div>
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
          <div>
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

          <div>
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
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
            <p>follow us on</p>
            <ul>
                <li></li>
            </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
