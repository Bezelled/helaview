import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import { ProtectedRoute } from "./components/misc/ProtectedRoute"
import { history } from './utils/browserHistory';
import { setAuthToken } from './utils/setAuthToken';

// lazy() ensures code splitting - so user will not have to download a large JS file

const Landing = lazy(() => import('./pages/LandingPage'));
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Privacy = lazy(() => import('./pages/PrivacyPolicy'));
const ToS = lazy(() => import('./pages/TermsOfService'));
const Register = lazy(() => import('./pages/Signup'));
const RegisterTourist = lazy(() => import('./pages/SignupTourist'));
const RegisterHotel = lazy(() => import('./pages/SignupHotel'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/404'));
const HotelProfile = lazy(() => import('./pages/HotelProfile'));
const HotelBooking = lazy(() => import('./pages/HotelBooking'));
const NewSettings = lazy(() => import('./pages/NewSettings'));
const HotelsList = lazy(() => import('./pages/HotelsList'));
const AddOffers = lazy(() => import('./pages/AddOffers'));

//check jwt token
const token = localStorage.getItem("token");
if (token)
  setAuthToken(token);

export default function App() {
  return (
    <Router history={history}>
        {/* Helps accessibility by announcing to screen readers */}
      <AccessibleNavigationAnnouncer />
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* Place new routes over this */}
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/tos" component={ToS} />
        <Route path="/privacy-policy" component={Privacy}/>
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/register" component={Register} />
        <Route path="/register-tourist" component={RegisterTourist} />
        <Route path="/register-hotel" component={RegisterHotel} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/search" component={Search} />
        <Route path="/profile-hotel" component={HotelProfile} />
        <Route path="/booking/hotel"  component={HotelBooking} />
        <Route path="/settings"  component={NewSettings} />
        <Route path="/list"  component={HotelsList} />

        {/* Place protected routes over this */}
        <ProtectedRoute path="/profile/me" component={HotelProfile} />
        <ProtectedRoute path="/hotels/addOffers"  component={AddOffers} />
        <Route path="/" component={Layout} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}