import React from 'react';
import { Label, Input, Button } from '@windmill/react-ui';
import axios from 'axios';
import toast from 'react-hot-toast';

import Header from "../components/headers/light.js";
import ImageLight from '../assets/img/forgot-password-office.jpeg';
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg';

export default function ForgotPassword() {

  const handleSubmit = async(event) => {
    event.preventDefault();
    const email = event.target.email.value;
  
    if (!email)
      return toast.error('Please enter a valid e-mail address.');
  
    try{
      const resp = await axios.post('http://127.0.0.1:7788/api/forgotPassword', {
        'email': event.target.email.value
      });
      toast.success(resp.data.message);
    } catch (e){
  
      if (e.response?.data.error)
        return toast.error(e.response.data.error);
      
      toast.error('Uh oh! An error occurred.');
    };
  }
  
  return (
    <><Header /><div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office" />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office" />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>
              <form onSubmit={handleSubmit}>
              <Label>
                <span>Email</span>
                <Input id="email" type="email" className="mt-1" placeholder="hello@helaview.lk" required/>
              </Label>

              <Button type="submit" block className="mt-4">
                Recover password
              </Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div></>
  )
}
