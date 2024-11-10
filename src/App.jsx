import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ReverseLookup from './pages/ReverseLookup';
import GuessGame from './pages/GuessGame';
import Background from './components/Background';
import './index.css';

function App() {
  return (
      <NextUIProvider>
        <Router>
          <Background />
          <div className="min-h-screen">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reverse" element={<ReverseLookup />} />
                <Route path="/game" element={<GuessGame />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NextUIProvider>
  );
}

export default App;