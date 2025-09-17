import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Blood Wave</h1>
          <p className="text-gray-200">
            Donate blood, save lives. Blood Wave makes it easy to find donors
            and request blood.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donors" className="hover:text-yellow-300">
                Find Donor
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-300">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="hover:text-yellow-300">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Contact Us</h2>
          <p>📞 Phone: +880 1306 068 794</p>
          <p>✉️ Email: info@bloodwave.com</p>
          <p>📍 Address: Kushtia, Khulna, Bangladesh</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/30 pt-4 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} Blood Wave. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
