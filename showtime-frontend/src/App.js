
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoviesPage } from './pages/MoviesPage';
import { HomePage } from './pages/Home';
import { MusicShowsPage } from './pages/MusicShowsPage';
import { SportsPage } from './pages/SportsPage';
import { PlaysPage } from './pages/PlaysPage';
import { StandupPage } from './pages/StandupPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ListYourShowPage } from './pages/ListYourShowPage';
import { CorporatesPage } from './pages/CorporatesPage';
import { OffersPage } from './pages/OffersPage';
import { GiftCardsPage } from './pages/GiftCardsPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/music-shows" element={<MusicShowsPage/>}/>
          <Route path="/sports" element={<SportsPage/>}/>
          <Route path="/plays" element={<PlaysPage/>}/>
          <Route path="/standup" element={<StandupPage/>}/>
          <Route path="/activities" element={<ActivitiesPage/>}/>
          <Route path="/list-your-show" element={<ListYourShowPage/>}/>
          <Route path="/corporates" element={<CorporatesPage/>}/>
          <Route path="/offers" element={<OffersPage/>}/>
          <Route path="/giftcards" element={<GiftCardsPage/>}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
