import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });

    const navigate = useNavigate();

    function login() {
        console.log('Gebruiker is ingelogd!');
        toggleAuth({
            isAuth: true,
            user: 'fake@email.nl',
        });
        navigate('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        toggleAuth({
            isAuth: false,
            user: null,
        });
        navigate('/');
    }

    const contextData = {
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