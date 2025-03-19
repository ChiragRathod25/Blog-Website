import React, { useEffect, useState } from "react";
import bucketService from "../appwrite/config_bucket";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getFeaturedImage = async () => {
      try {
        const imageData = await bucketService.getFilePreview(featuredImage);
        setImageUrl(imageData.href);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getFeaturedImage();
  }, [featuredImage]); // Added dependency to prevent infinite re-renders

  return (
    <Link to={`/post/${$id}`} className="block transition-transform duration-300 hover:scale-105">
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Image Container */}
        <div className="w-full mb-4 overflow-hidden rounded-xl h-[200px] bg-gray-200 flex justify-center items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
          ) : (
            <div className="text-gray-400">Loading Image...</div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
