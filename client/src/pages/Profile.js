import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header, { NavLinks, NavLink, PrimaryLink } from "../components/headers/light.js";
import { StyledDiv } from "../utils/AnimationRevealPage.js";

const IllustratedContainer = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`max-w-screen-xl shadow-2xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 sm:rounded-lg flex justify-center flex-1 bg-center bg-cover bg-no-repeat`}
`;

// export default function Profile(){
//   return (
//     <StyledDiv className="App">
//         <Header links={[
//       <NavLinks key={1}>
//         <NavLink href="/about">About</NavLink>
//         <NavLink href="/contact-us" tw="lg:ml-12!">Contact Us</NavLink>
//       </NavLinks>
//     ]}/>
//     </StyledDiv>
//   )
// }

export default function Profile(){
    return (
      <StyledDiv>
          <Header />
      </StyledDiv>
    )
  }