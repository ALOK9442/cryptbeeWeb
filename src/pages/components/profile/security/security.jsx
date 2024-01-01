import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authslice';
import { Link } from 'react-router-dom';

function Security() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout())
    }
    return (
        <div className='flex flex-col items-center space-y-6 border-4 border-zinc-950 p-4 bg-zinc-950 rounded-xl mt-8 w-80 h-screen'>

            <p className='font-bold'>Security</p>
            <Link to="/home/profile/security/2fa" className='border-b-2 border-white w-full'>
                <button className=' flex justify-between w-full'>Two Factor authentication
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </Link>
            <Link to="/home/profile/security/set-pass" className='border-b-2 border-white w-full'>
                <button className=' flex justify-between w-full'>Change Password
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </Link>
            <button className='border-b-2 border-white flex justify-between w-full'
                onClick={() => handleClick()}
            >Logout
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default Security