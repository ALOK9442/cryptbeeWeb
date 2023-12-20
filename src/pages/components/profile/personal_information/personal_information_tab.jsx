import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../../../components/common/input'
import Button from '../../../../components/common/button'

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

    const handleSave = async () => {

    }

    return (
        <div className='border-4 border-zinc-950 p-4 bg-zinc-950 rounded-xl mt-6 w-80'>
            <div className='space-y-4 flex flex-col items-center justify-center'>
                <h1>
                    Personal Details
                </h1>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <img src={`${profilePicture}`} alt='profile_image' className='w-32 h-32 rounded-full border-2 border-white-500 object-cover' />
                    <p className='text-sm text-center'>We get your personal information from the verification process</p>

                    <div className='space-y-6 w-full'>
                        <Input
                            type='text'
                            label='Fullname'
                            defaultValue={`${fullName}`}
                            onchange={(e) => setFullName(e.target.value)}
                        />
                        <Input
                            type='text'
                            label='Pan Card Number'
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
        </div>
    )
}

export default PersonalInfo