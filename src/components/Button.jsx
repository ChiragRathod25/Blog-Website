import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-300 
        ${bgColor} ${textColor} ${className}
        hover:brightness-110 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
