import React from 'react'

export default function Button({
    children,
    label,
    type="button",
    className ="",
    ...props
}) {
  return (
    <button className={` bg-amber-500 border border-white rounded-md text-white p-3 ${className}`} {...props}>
        {children}
    </button>
  )
}
