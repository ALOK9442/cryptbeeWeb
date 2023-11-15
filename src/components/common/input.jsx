import React from 'react'

const Input = React.forwardRef(function Input({
    label,
    className = "",
    type = "text",
    ...props
}, ref) {
    return (
        <div className='w-full'>
            {label &&
                <label>
                    {label}
                </label>
            }
            <Input
                type="text"
                className={``}
                ref={ref}
                {...props}
            />
        </div>
    )
}
)
export default Input