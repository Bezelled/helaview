import React from 'react';
import { Link } from 'react-router-dom';
import { Label, Input, Button } from '@windmill/react-ui';
import axios from 'axios';
import toast from 'react-hot-toast';
import tw from "twin.macro";

import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";

export default function Login() {

  const handleSubmit = async(event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email)
      return toast.error('Please enter a valid e-mail address.');

    if (!password)
      return toast.error('Please enter a valid password.');

    try{
      const resp = await axios.post('http://127.0.0.1:7788/api/login', {
        'email': event.target.email.value,
        'password': event.target.password.value
      });

      toast.success(resp.data.message);
    } catch (e){

      if (e.response.data.error)
        return toast.error(e.response.data.error);
      
      toast.error('Uh oh! An error occurred.');
    };

  }

  return (
    <><Header links={[
      <NavLinks key={1}>
        <NavLink href="/contact-us">Contact Us</NavLink>
        <NavLink href="/login" tw="lg:ml-12!">Login</NavLink>
        <PrimaryLink css={tw`rounded-full lg:ml-12!`} href="/register">Sign Up</PrimaryLink>
      </NavLinks>
    ]} /><div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>

                <form onSubmit={handleSubmit}>

                  <Label>
                    <span>Email</span>
                    <Input id="email" className="mt-1" type="email" placeholder="support@helaview.lk" />
                  </Label>

                  <Label className="mt-4">
                    <span>Password</span>
                    <Input id="password" className="mt-1" type="password" placeholder="***************" />
                  </Label>

                  <Button type="submit" className="mt-4" block>
                    Log in
                  </Button>

                  <hr className="my-8" />

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                      to="/forgot-password"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                  <p className="mt-1">
                    <Link
                      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                      to="/register"
                    >
                      Create account
                    </Link>
                  </p>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div></>
  )
}