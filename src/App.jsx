import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar'
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import Filters from "./Components/Filters"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
            <Route path='/navbar' element={<NavBar />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/filters' element={<Filters />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
