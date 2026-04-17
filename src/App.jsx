import './App.css'
import {Route, Routes } from 'react-router-dom';
import Home from "./pages/homePage/Home.jsx";
import Pokedex from "./pages/pokedexPage/Pokedex.jsx";
import Login from "./pages/loginPage/Login.jsx";
import Register from "./pages/registerPage/Register.jsx";
import Quiz from "./pages/quizPage/Quiz.jsx";
import Team from "./pages/teamPage/Team.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";


function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/pokedex" element={<Pokedex/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/team" element={<Team/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
