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
    console.log("news1")
    const fetchNews = async () => {
      try {
        console.log("try news on homepage");
        const response = await getNews();
        console.log("response data: news1", response.data);

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
      <div className='overflow-y-hidden news'>
        <div className='mt-6 p-2 pl-0'>
          <h1 className='font-bold text-lg underline newsTitle'>Crypto News!</h1>
        </div>
        {news && (
          <div className="news-container overflow-y-auto max-h-96 px-0 pt-0 p-4 bg-transparent">
              {news.map(item => (
                <div key={item.headline} className="pl-0 pt-0 p-5 flex items-center">
                  <a href={item.news} target="_blank" rel="noopener noreferrer" className="flex items-center ">
                    <img src={`${item.image}`} className='mr-2' />
                    {item.headline}
                  </a>
                </div>
              ))}
            </div>
        )}
      </div>
    </>
  );

}

export default News;
