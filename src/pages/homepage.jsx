import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHoldings, getNews, getUser } from '../services/apiservices.jsx/apiintegration';
import { useId } from 'react';
import panVerifyImage from "../assets/illustrations/pan.svg"
import { userDetails } from '../store/slices/userslice';
import { Link } from 'react-router-dom';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState(null);
  const dispatch = useDispatch();
  const [holdings, setHoldings] = useState([]);
  const [userName, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("")

  const authStatus = useSelector(state => state.auth.isAuthenticated);
  console.log(authStatus);
  const id = useId();
  const panStatus = useSelector(state => state.user.panVerify)
  // const panStatus = true;
  console.log(panStatus)

  console.log("t")

  const getUserDetails = async () => {
    const result = await getUser();
    console.log("result", result.data)
    const setName = result.data.name;
    console.log(setName.toUpperCase())
    // setName.toUpperCase();
    setUserName(setName)

    const photoLink = result.data.profile_picture;
    setProfilePhoto(photoLink)
    console.log(photoLink)
    dispatch(userDetails(result.data));
  }

  useEffect(() => {
    console.log("1")
    getUserDetails();
    const fetchNews = async () => {
      try {
        console.log("try news on homepage");
        const response = await getNews();
        console.log("response data:", response.data);

        // Check if response data is null or not as expected
        if (response.data !== null && response.data !== undefined) {
          setNews(response.data);
        } else {
          console.log("Invalid response data:", response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("s")
        console.log("Error fetching news:", error);
        setIsLoading(false);
        throw error;
      }
    };

    const getUserHolding = async () => {
      console.log("getuserholding")
      try {
        console.log("trying to get holdings")
        const response = await getHoldings();
        const output = response.data;
        console.log(output)
        setHoldings(response.data.MyHoldings)
      } catch (error) {
        console.log(error)
      }
    }

    console.log("2")
    //call both userholdings and fetchNews function if the 
    if (authStatus && panStatus) {
      getUserHolding();
      fetchNews();
    }
    else if (authStatus) {
      fetchNews();
    } else {
      setIsLoading(false);
    }
  }, [authStatus, panStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex justify-center w-80 mx-auto sm:w-full md:w-2/3 lg:w-1/2 xl:w-full mt-2 bg-gray-900'>
      {
        authStatus ? (
          <div className=''>
            <div className='mt-2 flex items-center space-x-4 bg-black-500'>
              <img src={`${profilePhoto}`} alt='profile_image' className='w-12 h-12 rounded-full object-cover'/>
              <h1>{userName.toUpperCase()}</h1>
            </div>
            <div>
              {
                panStatus ? (
                  <div className='space-y-2 mt-2'>
                    <div className=''>
                      <h1> My Holdings</h1>
                    </div>
                    <div className='flex flex-wrap space-x-2'>
                      {holdings &&
                        holdings.map((item, index) => (
                          <div key={index} className='mt-4'>
                            <img src={`https://www.${item[1]}`} alt='coin-img' className='w-12 h-12' />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ) :
                  (
                    <div>
                      <h1>
                        <img src={panVerifyImage} alt='pan' />
                        <p>Verify your pan</p>
                      </h1>
                    </div>
                  )
              }
            </div>

            <div>
              <div className='mt-6 p-2'>
                <h1>Crypto News</h1>
              </div>
              {news && (
                <div className="news-container overflow-y-auto max-h-96 px-0 p-4 mb-8 bg-transparent">
                  <ul className="p-0">
                    {news.map(item => (
                      <ul key={item.headline} className="pl-0 p-5 flex items-center">
                        <a href={item.news} target="_blank" rel="noopener noreferrer" className="flex items-center ">
                          <img src={`${item.image}`} className='mr-2' />
                          {item.headline}
                        </a>
                      </ul>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className='flex items-center justify-evenly bg-black rounded-xl p-4 sticky bottom-0 left-0 right-0 z-10 text-amber-500'>
              <Link to="/home">
                <h1>Home</h1>
              </Link>
              <Link to="/invest">
                <h1>Invest</h1>
              </Link>
              <Link to="/wallet">
                <h1>Wallet</h1>
              </Link>
              <Link to="/profile">
                <h1>Profile</h1>
              </Link>
            </div>
          </div>
        ) : (
          <h1>you are not authenticated</h1>
        )
      }
    </div>
  );

}

export default HomePage;
