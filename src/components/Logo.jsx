import React from 'react'
function Logo({ width = "100px" }) {
  return (
    <div className="flex justify-center">
      <img
        src="/logo.webp"
        alt="Logo"
        className="rounded-full"
        style={{ width: width }}
      />
     
      </div>
  );
}


export default Logo