import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import GameSelector from './components/GameSelector/GameSelector';
import NavBar from './components/Header/Header'; // Importamos NavBar
import UserProfile from './pages/UserProfile/UserProfile'; // Importamos UserProfile
import { users } from './Data'; // Importamos los usuarios desde Data
import { UserProvider } from "./components/Context/UserContext"; // Importamos el UserProvider
import Game from './components/Game/Game.jsx';
import './App.css';


function App() {

  return (
    <UserProvider>
      <Router>
        {/* Mostrar el NavBar siempre, y pasamos el estado del usuario */}
        <NavBar/>
        
        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/game-selector" element={<GameSelector/>} />
          <Route path="/user-profile" element={<UserProfile/>} />
          <Route path="/game" element={<Game/>} />
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;