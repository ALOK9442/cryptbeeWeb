import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo/logo.png';
import mailOpenerIllustration from '../assets/illustrations/mailOpener.svg';
import backgroundImage from "../assets/background.png";

const MailOpener = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <p className="text-white text-2xl font-bold">CryptBee</p>
        </div>
        <div className="mt-8">
          <img
            src={mailOpenerIllustration}
            alt="Mail Opener Illustration"
            className="h-36 w-36 mb-4 mx-auto"
          />
        </div>
        <div className="mt-8 px-6">
          <p className="text-white text-2xl font-bold">Almost there! Check your inbox</p>
        </div>
        <div className="mt-4 px-6">
          <p className="text-white text-lg">
            Confirm your identity by clicking the link I sent to <span className="font-bold">{email}</span>
          </p>
          <p className="text-white text-lg">
            Click on <Link to="/" className="text-blue-400 font-bold">login</Link> after verifying the account from mail
          </p>
        </div>
      </div>
    </div>
  );
};

export default MailOpener;
