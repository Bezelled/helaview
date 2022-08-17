import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';

const Landing = lazy(() => import('./pages/LandingPage'));
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Privacy = lazy(() => import('./pages/PrivacyPolicy'));
const ToS = lazy(() => import('./pages/TermsOfService'));
const CreateAccount = lazy(() => import('./pages/SignupTourist'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

export default function App() {
  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/tos" component={ToS} />
        <Route path="/privacy-policy" component={Privacy}/>
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/register" component={CreateAccount} />
        <Route path="/forgot-password" component={ForgotPassword} />

        {/* Place new routes over this */}
        <Route path="/app" component={Layout} />
      </Switch>
    </Router>
  )
}