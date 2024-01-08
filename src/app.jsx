import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from './assets/background.png';
import { useSelector } from 'react-redux';

const App = () => {
  const authStatus = useSelector(state => state.auth.isAuthenticated)
  return (
    <>
      <div>
        {
          authStatus ? (
            <div className="min-h-screen bg-cover bg-center overflow-y-hidden bg-gray-900">
              <div className="flex flex-col h-screen text-white pl-2 pr-2 overflow-y-hidden overflow-x-hidden">
                {/* <main> */}
                  <Outlet />
                {/* </main> */}
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-cover bg-center overflow-y-hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
              <div className="flex flex-col h-screen text-white pl-2 pr-2 overflow-y-hidden">
                {/* <main> */}
                  <Outlet />
                {/* </main> */}
              </div>
            </div>
            )
        }
      </div>
    </>
  );
};

export default App;
