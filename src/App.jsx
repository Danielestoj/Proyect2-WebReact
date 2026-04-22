import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import GameSelector from './components/GameSelector/GameSelector';
import NavBar from './components/Header/Header';
import UserProfile from './pages/UserProfile/UserProfile';
import Game from './components/Game/Game';

import { UserProvider } from "./components/Context/UserContext";
import { GameDataProvider } from "./components/Context/GameDataContext";

import './App.css';

function App() {
  return (
    <UserProvider>
      <GameDataProvider>
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/game-selector" element={<GameSelector />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Router>
      </GameDataProvider>
    </UserProvider>
  );
}

export default App;
