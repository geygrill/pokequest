import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from "./pages/homePage/Home.jsx";
import Pokedex from "./pages/pokedexPage/Pokedex.jsx";
import Login from "./pages/authPages/Login.jsx";
import Register from "./pages/authPages/Register.jsx";
import Quiz from "./pages/quizPage/Quiz.jsx";
import Team from "./pages/teamPage/Team.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import DetailPage from "./pages/detailPage/detailPage.jsx";


function App() {
    const { isAuth } = useContext(AuthContext);

  return (
    <>
        <Navigation />
        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<NotFound/>}/>

                <Route path="/pokedex" element={ isAuth ? <Pokedex/> : <Navigate to="/login"/>}/>
                <Route path="/quiz" element={ isAuth ? <Quiz/> : <Navigate to="/login"/>}/>
                <Route path="/team" element={ isAuth ? <Team/> : <Navigate to="/login"/>}/>

                <Route path="/pokemon/:id" element={<DetailPage />} />
            </Routes>
        </main>

    </>
  )
}

export default App
