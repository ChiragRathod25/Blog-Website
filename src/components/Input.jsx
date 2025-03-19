import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-300 w-full 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
          dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 
          ${className}
        `}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
