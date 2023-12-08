import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from './assets/background.png';

const App = () => {
  return (
    <div className="min-h-screen bg-cover bg-center overflow-y-hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col h-screen text-white">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
