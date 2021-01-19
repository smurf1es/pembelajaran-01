import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <>
      <Header />
      <HomeScreen />
      <Footer />
    </>
  );
}

export default App;
