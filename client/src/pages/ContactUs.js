import React from "react";
import AnimationRevealPage from "../utils/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import ContactUsForm from "../components/forms/TwoColContactUsWithIllustrationFullForm.js";
import tw from "twin.macro";

export default () => {
  return (
    <AnimationRevealPage>
      <Header links={[
        <NavLinks key={1}>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/login" tw="lg:ml-12!">Login</NavLink>
          <PrimaryLink css={false && tw`rounded-full`}href="/register">Sign Up</PrimaryLink>
        </NavLinks>
      ]}/>
      <ContactUsForm />
      <Footer />
    </AnimationRevealPage>
  );
};
