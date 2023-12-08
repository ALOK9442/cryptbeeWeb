import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHoldings, getNews, getUser } from '../services/apiservices.jsx/apiintegration';
import { useId } from 'react';
import panVerifyImage from "../assets/illustrations/pan.svg"
import { userDetails } from '../store/slices/userslice';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState(null);
  const dispatch = useDispatch();
  const [holdings, setHoldings] = useState([]);
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
    <div className='flex items-center justify-center'>
      {
        authStatus ? (
          <div>
            <div>
              {
                panStatus ? (
                  <div>
                    <h1> your holdings</h1>
                    { holdings &&
                      holdings.map((item,index)=>(
                        <li key={index}>{item[0]} <img src={item[1]} alt='coin-img'/> {item[2]}</li>
                      ))
                    }
                  </div>
                ) :
                  (
                    <div>
                      <div>
                        <h1>Welcome to news page</h1>
                      </div>
                      <h1>
                        <img src={panVerifyImage} alt='pan' />
                        <p>Verify your pan</p>
                      </h1>
                    </div>
                  )
              }
            </div>

            <div>
              {news && (
                <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto', margin: 'auto' }}>
                  {news.map(item => (
                    <li key={item.headline} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>{item.headline}</li>
                  ))}
                </ul>
              )}
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
