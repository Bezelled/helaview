import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import HelaLandingPage from "./pages/LandingPage";
import ThankYouPage from "ThankYouPage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "pages/Signup";
import Login from "pages/Login";
import PrivacyPolicy from "pages/PrivacyPolicy";
import TermsOfService from "pages/TermsOfService";
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/components/:type/:subtype/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/components/:type/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/thank-you">
          <ThankYouPage />
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/about">
          <AboutUs />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
        <Route path="/privacy-policy">
          <PrivacyPolicy />
        </Route>
        <Route path="/tos">
          <TermsOfService />
        </Route>
        <Route path="/">
          <HelaLandingPage />
        </Route>
      </Switch>
    </Router>
  );
}