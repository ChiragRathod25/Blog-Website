import React, { useId } from "react";

const Select = React.forwardRef(({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Select Dropdown */}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-300 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          duration-200 cursor-pointer w-full hover:bg-gray-100 ${className}`}
        {...props}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
