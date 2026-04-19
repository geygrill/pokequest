import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from "./pages/homePage/Home.jsx";
import Pokedex from "./pages/pokedexPage/Pokedex.jsx";
import Login from "./pages/loginPage/Login.jsx";
import Register from "./pages/registerPage/Register.jsx";
import Quiz from "./pages/quizPage/Quiz.jsx";
import Team from "./pages/teamPage/Team.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";


function App() {
    const { isAuth } = useContext(AuthContext);

  return (
    <>
        <Navigation />
        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/pokedex" element={ isAuth ? <Pokedex/> : <Navigate to="/"/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/quiz" element={<Quiz/>}/>
                <Route path="/team" element={ isAuth ? <Team/> : <Navigate to="/"/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </main>

    </>
  )
}

export default App
