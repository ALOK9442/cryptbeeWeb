import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleAlert = (message, type) => {
  const showToast = () => {
    if (type === 'success') {
      toast.success(message, {
        position: 'top-center',
      });
    } else if (type === 'error') {
      toast.error(message, {
        position: 'top-center',
      });
    } else {
      toast.info('Something went wrong', {
        position: 'top-center',
      });
    }
  };

  return <div>{showToast()}</div>;
};
