import React from "react";
import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";

import tw from "twin.macro";
const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 p-8 overflow-hidden`;

export default () => (
  <StyledDiv className="App">
    <Hero />
    <Features />
    <SliderCard />
    <TrendingCard />
    <MainFeature />
    <Testimonial textOnLeft={true}/>
    <SubscribeNewsLetterForm />
    <Footer />
  </StyledDiv>
);
