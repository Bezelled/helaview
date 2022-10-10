import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../../utils/auth';

// Only allow logged-in users to access this route
export const ProtectedRoute = ({ component: Component, ...rest }) => {
   return (
       <Route {...rest}
           render={props => (
                isLoggedIn() ?
                   <Component {...props} />
                   :
                   <Redirect to={{ pathname: '/login' }} />
           )}
       />
   );
};

// Only allow admins to access this route
export const AdminRoute = ({ component: Component, ...rest }) => {
   return (
       <Route {...rest}
           render={props => (
                isAdmin() ?
                   <Component {...props} />
                   :
                   <Redirect to={{ pathname: '/' }} />
           )}
       />
   );
}