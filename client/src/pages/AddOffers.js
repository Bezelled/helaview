import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import toast from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/headers/dark.js";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function AddOffers() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSubmit = async(event) => {
        event.preventDefault();
      
        try{
          const resp = await axios.post('http://127.0.0.1:7788/api/hotels/addOffers', {
            'code': event.target['offer code'].value,
            'name': event.target['offer name'].value,
            'description': event.target['offer description'].value,
            'start date': event.target['start date'].value,
            'end date': event.target['end date'].value
          });
          toast.success(resp.data.message);
        } catch (e){

        console.log(e);
      
          if (e.response?.data?.error)
            return toast.error(e.response.data.error);
          
          toast.error('Uh oh! An error occurred.');
        };
      }

    return (
      <div className="space-y-6">
        <Header />
  
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Add Offers</h3>
              <p className="mt-1 text-sm text-gray-500">You can add your hotel offers here.</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="offer code" className="block text-sm font-medium text-gray-700">
                        Offer Code
                    </label>
                    <input
                      type="text"
                      name="offer code"
                      id="offer code"
                      placeholder="CODE20OFF"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="offer name" className="block text-sm font-medium text-gray-700">
                      Offer Name
                    </label>
                    <input
                      type="text"
                      name="offer name"
                      id="offer name"
                      placeholder="HelaView Hotel - 20% Off"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                    <label htmlFor="offer description" className="block mt-5 text-sm font-medium text-gray-700">
                        Offer Description
                    </label>
                    <div className="my-1">
                        <textarea
                        id="offer description"
                        name="offer description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="This discount gives you 20% off"
                        defaultValue={''}
                        />
                    </div>
                </div>
                
                <label htmlFor="start date" className="block text-sm font-medium text-gray-700">
                      Start Date
                </label>
                <DatePicker id="start date" selected={startDate} onChange={(date) => setStartDate(date)} />

                <label htmlFor="end date" className="block text-sm font-medium text-gray-700">
                      End Date
                </label>
                <DatePicker id="end date" selected={endDate} onChange={(date) => setEndDate(date)} />

                <div className="flex justify-end">
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="mr-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  