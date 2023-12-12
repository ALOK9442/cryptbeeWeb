import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getUser } from '../../../services/apiservices.jsx/apiintegration';


function News() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState(null);
  const dispatch = useDispatch();

  const authStatus = useSelector(state => state.auth.isAuthenticated);
  console.log(authStatus);

  console.log("t")
  useEffect(() => {
    console.log("1")
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

    if (authStatus) {
      fetchNews();
    } else {
      setIsLoading(false);
    }
  }, [authStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {/* <div className='flex justify-center w-80 mx-auto sm:w-full md:w-2/3 lg:w-1/2 xl:w-full mt-2 bg-gray-900'> */}
      {/* {
        authStatus ? ( */}
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
      {/* ) : (
          <h1>you are not authenticated</h1>
        )
      } */}
    {/* </div> */}
    </>
  );

}

export default News;
