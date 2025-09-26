import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import './App.css';
import Hero from './components/Hero/Hero.jsx';
import Menu from './components/Menu/Menu.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import Footer from './components/Footer/Footer.jsx';

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