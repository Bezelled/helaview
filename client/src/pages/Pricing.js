import React from "react";
import AnimationRevealPage from "../utils/AnimationRevealPage.js";
import Header from "../headers/light.js";
import Pricing from "../pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "../testimonials/ThreeColumnWithProfileImage.js";
import Footer from "../footers/FiveColumnWithInputForm.js";
import FAQ from "../faqs/SingleCol.js";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Pricing />
      <Testimonial
        heading="Our Paying Customers"
      />
      <FAQ />
      <Footer/>
    </AnimationRevealPage>
  );
};
