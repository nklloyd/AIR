//CITATION: https://www.youtube.com/watch?v=lATafp15HWA (12:55)

import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from "./pages/Home"
import  Explore from "./pages/Explore"
import { Map } from "./pages/Map"
import { Profile } from "./pages/Profile"
import { Navbar } from './components/Navbar'


function App() {
return(
  <>
    <Navbar />
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Container>
  </>
)
}

export default App
