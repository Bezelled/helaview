import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import Feature from "../components/features/TwoColWithButton.js";
import { StyledDiv } from "../utils/AnimationRevealPage.js"; 
const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  return (
    <StyledDiv className="App">
      <Header links={[
        <NavLinks key={1}>
        <NavLink href="/contact-us">Contact Us</NavLink>
        <NavLink href="/login" tw="lg:ml-12!">Login</NavLink>
        <PrimaryLink css={tw`rounded-full lg:ml-12!`} href="/register">Sign Up</PrimaryLink>
      </NavLinks>
      ]}/>
      <Feature
        subheading={<Subheading>About HelaView</Subheading>}
        heading="A tourism project by Magma&reg;."
        description="We are a multinational company which also takes up local projects. We have diversified in resourcing projects and software development. We provide resources and develops software applications for local and foreign clients."
        buttonRounded={false}
        primaryButtonText=""
        primaryButtonUrl=""
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
      />
      <Footer />
    </StyledDiv>
  );
};
