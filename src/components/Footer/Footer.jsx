import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
    },
    {
      title: "Support",
      links: ["Account", "Help", "Contact Us", "Customer Support"],
    },
    {
      title: "Legals",
      links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
    },
  ];

  return (
    <footer className="py-10 bg-gray-900 text-gray-200 border-t border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Left Section */}
          <div className="w-full md:w-1/2 lg:w-5/12 mb-6 md:mb-0">
            <div className="flex flex-col items-center md:items-start">
              <Logo width="100px" />
              <p className="mt-4 text-sm text-gray-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-2/12 mb-6 md:mb-0">
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx} className="mb-3">
                    <Link
                      to="/"
                      className="text-base text-gray-300 hover:text-white transition duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
