//CITATION: https://www.youtube.com/watch?v=lATafp15HWA (12:55)

//import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from "./pages/Home"
import Explore from "./pages/Explore"
import { Map } from "./pages/Map"
import { Profile } from "./pages/Profile"
import { Navbar } from './components/Navbar'
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Container fluid className="px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/map/:flightNumber" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
