import React from "react";

const Input = ({ label, type, placeholder, handleValueMethode }) => {
  return (
    <div className="flex flex-col lg:flex-col mx-auto items-start justify-around lg:mb-0">
      <label className="mb-2 ml-2 lg:ml-4 ">{label}</label>
      <input
        className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleValueMethode(e.target.value)}
      />
    </div>
  );
};

export default Input;
