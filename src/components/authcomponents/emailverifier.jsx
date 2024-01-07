import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function EmailVerifier() {
    const navigate = useNavigate()
    const [verificationText, setVerificationText] = useState("Cryptbee is verifying you...")
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const queryString = window.location.search
                const params = new URLSearchParams(queryString);
                const email = params.get('email')
                const id = params.get('token')
                const onapp = params.get('onapp')
                console.log(onapp)
                console.log(`${queryString}, ${params},${email},${id} `)
                const response = await axios.post('https://cryptbee.anshumannandan.tech/auth/verifyemailLINK/', {
                    id,
                    email,
                    onapp,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                      },
                }
                )
                console.log(response)
                // if (response.status === 200){
                //     setVerificationText("You Have Been Successfully Verified. Open The Website To Enjoy The Services")
                //     console.log(response.data)
                //     // dispatch()
                //     // navigate('/verify-pan')
                // }else {
                //     let showcase;
                //     if(response.data.message[0] !=null) showcase = response.data.message[0]
                //     else if(response.data.UUID != null) showcase = response.data.UUID[0]
                //     else showcase = "Some Error Occurred"
                //     setVerificationText(showcase)
                // }
            } catch (error) {
                console.log(error)
                setVerificationText(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])


    return (
        <div className="flex justify-center items-center flex-col h-screen">
          <h2 className="text-2xl" id="text">
            {verificationText}
          </h2>
          {isLoading && <div className="border-8 border-t-8 border-gray-300 border-solid rounded-full w-8 h-8 animate-spin" id="loader"></div>}
        </div>
      );
    };
    

export default EmailVerifier