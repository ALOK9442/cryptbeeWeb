import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../../components/common/input'
import Button from '../../../components/common/button'

function PersonalInfo() {
    const [profilePicture, setProfilePicture] = useState(useSelector(state => state.user.photo))
    const [fullName, setFullName] = useState(useSelector(state => state.user.name))
    const [panNumber, setPanNumber] = useState(useSelector(state => state.user.pan))

    console.log(profilePicture)
    console.log(fullName)
    console.log(panNumber)

    const photo = useSelector((state) => state.user.photo);
    const name = useSelector((state) => state.user.name);
    const pan = useSelector((state) => state.user.pan);

    useEffect(() => {
        setFullName(name)
        setPanNumber(pan)
        setProfilePicture(photo)
    }, [photo, name, pan])

    const handleSave = async() => {

    }

    return (
        <div className='border-4 border-zinc-950 p-4 bg-zinc-950 rounded-xl mt-8 w-80'>
            <div className='space-y-6 flex flex-col items-center justify-center'>
                <h1>
                    Personal Details
                </h1>
                <div>
                    <img src={`${profilePicture}`} alt='profile_image' className='w-40 h-40 rounded-full border-2 border-white-500 object-cover' />
                </div>
                <div className='space-y-6'>
                    <Input
                        type='text'
                        label='Fullname'
                        defaultValue={`${fullName}`}
                        onchange={(e) => setFullName(e.target.value)}
                    />
                    <Input
                        type='text'
                        label='Fullname'
                        defaultValue={`${panNumber}`}
                        onchange={(e) => setPanNumber(e.target.value)}
                    />
                    <Button className='w-full'
                        onClick={() => { handleSave() }}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo