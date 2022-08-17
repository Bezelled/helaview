import React from "react";
import { StyledDiv } from "../utils/AnimationRevealPage.js";
import Header from "../headers/light.js";
import Pricing from "../pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "../testimonials/ThreeColumnWithProfileImage.js";
import Footer from "../footers/FiveColumnWithInputForm.js";
import FAQ from "../faqs/SingleCol.js";

export default () => {
  return (
    <StyledDiv className="App">
      <Header />
      <Pricing />
      <Testimonial
        heading="Our Paying Customers"
      />
      <FAQ />
      <Footer/>
    </StyledDiv>
  );
};
