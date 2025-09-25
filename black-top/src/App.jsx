import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Reviews from './components/Reviews/Reviews';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero/>
      <Menu/>
      <About/>
      <Reviews/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;