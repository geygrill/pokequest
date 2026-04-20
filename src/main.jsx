import React from 'react';
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import AuthContextProvider from "./context/AuthContext.jsx";
import PokemonContextProvider from "./context/PokemonContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <PokemonContextProvider>
                    <App />
                </PokemonContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
);