import React from 'react';

const Input = React.forwardRef(function Input({
    label,
    className = "",
    type = "text",
    ...props
}, ref) {
    return (
        <fieldset className="border-2 border-white rounded-md w-full">
            {label &&
                <legend className="text-white-500 px-2 py-0">
                    {label}
                </legend>
            }
            <div className='w-full flex items-center'>
                <input
                    type={type}
                    className={`w-full text-white bg-transparent outline-none p-3 mt-0 pt-1 ${className}`} 
                    ref={ref}
                    {...props}
                />
            </div>
        </fieldset>
    );
});

export default Input;
