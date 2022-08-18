import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import { Link } from 'react-router-dom';
import { Button } from '@windmill/react-ui';
import { StyledDiv } from "../utils/AnimationRevealPage.js";

const MainHeading = tw.h1`mx-auto max-w-xs text-center text-3xl xl:text-4xl font-extrabold text-primary-500`;
const Heading = tw.h1`mx-auto max-w-xs text-2xl mb-4 text-center xl:text-3xl font-extrabold`;

export default () => (
    <StyledDiv className="App">
        <Header links={[
            <NavLinks key={1}>
                <NavLink href="/about">About</NavLink>
                <NavLink css={tw`lg:ml-12!`} href="/contact-us">Contact Us</NavLink>
                <PrimaryLink css={tw`rounded-full lg:ml-12!`} href="/login">Login</PrimaryLink>
            </NavLinks>
      ]}/>
        <div className="flex w-full min-h-screen overflow-x-hidden items-center rounded-lg bg-gray-100 p-20 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-xl mx-auto overflow-hidden p-6 bg-white border-dashed border-4 border-primary-500 rounded-lg shadow-xl dark:bg-gray-800">
                <MainHeading>HOLD ON!</MainHeading>
                <Heading>Are you a...</Heading>
                <div className="p-6 grid grid-cols-2 gap-4 place-content-stretch ">
                    <Button size="larger" tag={Link} to="/register-tourist">
                        Tourist
                    </Button>
                    <Button size="larger" tag={Link} to="/register-hotel">
                        Hotel
                    </Button>
                </div>
            </div>
    </div>
    </StyledDiv>
);