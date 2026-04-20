import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });


    useEffect(() => {

        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            if(isTokenValid(decoded)) {
                toggleAuth({
                    isAuth: true,
                    status: 'done',
                    user: {
                        id: decoded.userId,
                        email: decoded.email,
                        roles: decoded.role,
                    }
                })
            } else {
                toggleAuth({
                    ...auth,
                    status: 'done',
                })
            }
        } else {
            toggleAuth({
                ...auth,
                status: 'done',
            })
        }

    }, [])

    const navigate = useNavigate();

    function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        console.log('Gebruiker is ingelogd!');
        toggleAuth({
            isAuth: true,
            status: 'done',
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
            status: 'done',
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
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;