import React from "react";
import { Outlet } from "react-router-dom";
import backgroundImage from "./assets/background.png";
import { useSelector } from "react-redux";
import Navbar from "./pages/components/navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const gradient = "linear-gradient(190deg, #1F2937, #FFC107)";
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <div>
        <ToastContainer />
        {authStatus ? (
          <div className="min-h-screen bg-cover bg-center overflow-y-hidden bg-[#17171F]">
            <div className="flex flex-col h-screen text-white overflow-y-hidden overflow-x-hidden">
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-cover bg-center overflow-y-hidden bg-black">
            <div className="flex flex-col h-screen text-white pl-2 pr-2 overflow-y-hidden">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
