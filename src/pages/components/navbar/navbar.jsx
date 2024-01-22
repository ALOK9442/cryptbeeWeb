import { faChevronRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authslice';


function Navbar() {
    const dispatch = useDispatch();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const authStatus = useSelector(state => state.auth.isAuthenticated);
    const profilePhoto = useSelector(state => state.user.photo);
    const userName = useSelector(state => state.user.name);

    const onClick = () => {
        console.log("logout")
        dispatch(logout());
    }

    const width = window.innerWidth;
    
    useEffect(() => {
        console.log(width)
        if (window.innerWidth < 640) {
            setIsSmallScreen(true)
        }
        console.log(window.innerWidth)
    }, [width])
    return (
        <div className='flex'>
            <div className='mt-2 flex items-center space-x-4 w-screen'>
                {/* <div className='flex items-center space-x-4 bg-purple-600 w-screen'>`</div> */}
                <img src={`${profilePhoto}`} alt='profile_image' className='w-12 h-12 rounded-full object-cover' />
                <h1>{userName.toUpperCase()}</h1>
            </div>
            <div className='pr-2 flex items-center' onClick={onClick}>
                {
                    isSmallScreen===false &&
                    <h1 className='pr-2 text-lg'>Logout</h1>
                }
                <FontAwesomeIcon icon={faRightFromBracket} className="text-black bg-white w-4 h-4 rounded-full object-cover p-2" />
            </div>
        </div>
    )
}

export default Navbar