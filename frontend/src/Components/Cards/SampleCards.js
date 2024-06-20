import React from "react";

function SampleCards({ title, description }) {
  return (
    <div>
      <div className=" px-3 py-5 bg-white border border-gray-200 rounded-lg shadow  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="grey"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notepad-text"
        >
          <path d="M8 2v4" />
          <path d="M12 2v4" />
          <path d="M16 2v4" />
          <rect width="16" height="18" x="4" y="4" rx="2" />
          <path d="M8 10h6" />
          <path d="M8 14h8" />
          <path d="M8 18h5" />
        </svg>
        <a href="">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-500 ">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 ">{description}</p>
        <div className="inline-flex font-medium items-center text-blue-600 hover:underline">
          see more details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SampleCards;
