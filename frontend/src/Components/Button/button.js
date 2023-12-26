import React from 'react'

const button = ({text, onClick}) => {
  return (
    <div>
        <button onClick={onClick} className="bg-[#4743E0] text-white px-8 py-2 rounded-full   ">{text}</button>
    </div>
  )
}

export default button 