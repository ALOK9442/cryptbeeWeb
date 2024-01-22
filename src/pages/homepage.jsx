import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHoldings, getNews, getUser } from '../services/apiservices.jsx/apiintegration';
import { useId } from 'react';
import panVerifyImage from "../assets/illustrations/pan.svg"
import { userDetails } from '../store/slices/userslice';
import { Link, Outlet } from 'react-router-dom';
import News from './components/homepage/news';
import Footer from './components/footer/footer';
import UserHolding from './components/homepage/userholdings';
import Button from '../components/common/button';
import Navbar from './components/navbar/navbar';
// import { Outlet } from 'react-router-dom';

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
    if (authStatus) {
      fetchNews();
    } else {
      setIsLoading(false);
    }
  }, [authStatus, panStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex flex-grow justify-center mx-auto sm:w-full md:w-2/3 lg:w-1/2 xl:w-full mt-2'>
        {
          authStatus ? (
            <div className='overflow-y-hidden max-h-screen'>
              <Outlet />
              <div className='absolute w-full bottom-4 left-0 right-0 sm:pl-8 sm:pr-8 z-10'>
                <Footer />
              </div>
            </div>
          ) : (
            <h1>you are not authenticated</h1>
          )
        }
      </div>
    </div>
  );

}

export default HomePage;
