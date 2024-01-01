import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { sendProfilePhoto } from '../../../services/apiservices.jsx/apiintegration';
import { updateProfilePhoto, userDetails } from '../../../store/slices/userslice';
import { Link } from 'react-router-dom';

function ProfileTab() {

    const dispatch = useDispatch();
    const profilePhoto = useSelector(state => state.user.photo);
    console.log(profilePhoto);
    const userName = useSelector(state => state.user.name);
    console.log(userName);
    const email = useSelector(state => state.user.email);
    console.log(email);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log("files", file)
        if (file) {
            try {
                // Call the API function to upload the profile photo
                console.log("trying file")
                const response = await sendProfilePhoto(file);
                console.log(response)
                dispatch(updateProfilePhoto({ profile_picture: response.data.profile_picture }));
            } catch (error) {
                console.error('Error uploading profile photo:', error);
            }
        }
    };


    return (
        <>
            <div className='border-4 border-zinc-950 p-4 bg-zinc-950 rounded-xl mt-8 sm:w-80 '>
                <div className='space-y-6'>
                    <div className='mt-2 flex items-center justify-center space-x-4 bg-0xFF0F0F0C relative'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="profile-photo-input"
                        />
                        <label htmlFor="profile-photo-input">
                            <img src={`${profilePhoto}`} alt='profile_image' className='w-40 h-40 rounded-full border-2 border-white-500 object-cover' />
                        </label>
                        <div className="absolute top-24 left-28 right-0 bottom-0 flex items-center justify-center">
                            <FontAwesomeIcon icon={faPencilAlt} className="text-black bg-white rounded-full w-4 h-4 object-cover p-3" />
                        </div>

                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <h1>{userName}</h1>
                        <p>{email}</p>
                    </div>
                    <div className='space-y-4 '>
                        <div>
                            <Link to="/home/profile/personal-info">
                                <p className='border-b-2 border-white flex justify-between'>
                                    Personal Details
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/home/profile/security">
                                <p className='border-b-2 border-white flex justify-between'>
                                    Security
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </p>
                            </Link>
                        </div>
                        <div>
                            <p className='border-b-2 border-white flex justify-between'>
                                About CryptBee
                                <FontAwesomeIcon icon={faChevronRight} />
                            </p>
                        </div>
                        <div>
                            <p className='border-b-2 border-white flex justify-between'>
                                Help and Support
                                <FontAwesomeIcon icon={faChevronRight} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileTab