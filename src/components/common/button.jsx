import React from 'react'

export default function Button({
    children,
    label,
    type="button",
    className ="",
    onClick,
    ...props
}) {
  return (
    <button className={` bg-amber-500 border border-white rounded-md text-white p-3 ${className}`}
     onClick={onClick}
     {...props}
     >
        {children}
    </button>
  )
}
