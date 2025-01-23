import React, { useEffect,useState } from "react";
import bucketService from "../appwrite/config_bucket";
import { Link } from "react-router-dom";

function Postcard( { $id, title, featuredImage }) {
  // const { $id, title, featuredImage }=post
  const [imageUrl, setImageUrl] = useState("");
  useEffect(()=>{
    const getFeaturedImage=async ()=>{
      const imageData=await bucketService.getFilePreview(featuredImage);
      // console.log("Image data",imageData);
      setImageUrl(imageData.href)
    }
    getFeaturedImage()
  })

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
