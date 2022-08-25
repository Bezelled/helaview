import React from 'react';
import { StyledDiv } from "../utils/AnimationRevealPage.js";
import { SearchIcon } from '../assets/icons';
import { Input } from '@windmill/react-ui';
import Header from "../components/headers/light.js";

export default function Search(){

  return (
    <StyledDiv className="App">
        <Header />
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-primary-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
    </StyledDiv>
  )
}