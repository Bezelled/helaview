import axios from 'axios';
import { AccountType } from './shared';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
};

export const isLoggedIn = () => {
    return localStorage.getItem("token") ?  true : false;
}

export const isAdmin = () => {
    return (localStorage.getItem("accountType") === AccountType.Admin) ? true : false;
}

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountType");
    delete axios.defaults.headers.common["Authorization"];
}