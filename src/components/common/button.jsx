import React from 'react'

export default function Button({
    children,
    label,
    type="button",
    classname ="",
    ...props
}) {
  return (
    <button className={`bg-orange-500 w-328 h-48 absolute top-488 left-16 p-16 md:p-16 lg:p-32 border rounded-8 text-white ${classname}`} {...props}>
        {children}
    </button>
  )
}
