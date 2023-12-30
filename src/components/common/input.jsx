import React from 'react';

const Input = React.forwardRef(function Input({
    label,
    className = "",
    type = "text",
    onChange,
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
                    className={`w-full border-none text-white bg-transparent outline-none mt-0 ${className}`} 
                    ref={ref}
                    onChange={onChange}
                    {...props}
                />
            </div>
        </fieldset>
    );
});

export default Input;
