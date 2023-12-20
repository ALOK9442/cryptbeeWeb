import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authslice';

function Security() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout())
    }
    return (
        <div className='flex flex-col items-center justify-center space-y-6 border-4 border-zinc-950 p-4 bg-zinc-950 rounded-xl mt-8 w-80'>

            <p className='font-bold'>Security</p>
            <button className='border-b-2 border-white flex justify-between w-full'>Enable 2 Factor authentication
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <button className='border-b-2 border-white flex justify-between w-full'>Change Password
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <button className='border-b-2 border-white flex justify-between w-full'
                onClick={() => handleClick()}
            >Logout
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default Security