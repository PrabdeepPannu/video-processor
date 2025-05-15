// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}
