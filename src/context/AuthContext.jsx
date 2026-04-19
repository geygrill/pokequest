import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });

    useEffect(() => {

        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            console.log(decoded);
        }

    }, [])

    const navigate = useNavigate();

    function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        console.log('Gebruiker is ingelogd!');
        toggleAuth({
            isAuth: true,
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles,
            },
        });
        navigate('/');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        toggleAuth({
            isAuth: false,
            user: null,
        });
        navigate('/');
    }

    const contextData = {
        user: auth.user,
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;