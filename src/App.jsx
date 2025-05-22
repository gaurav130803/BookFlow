import react from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Slider from './components/Slider'

import logo from './images/logo.png';
import Genre from './pages/Genre';
import Aboutus from './pages/Aboutus';
import Footer from './components/Footer';
import Story from './components/Story';

function App() {
  
  return (
    
      <div className='bg-[rgba(236,225,225,0.89)] min-h-screen pt-1'> 
        <Navbar/>
        <div className="flex  justify-center gap-2 mt-5">
  <img src={logo} className="w-20 h-18 mt-2" alt="BookFlow Logo" />
  <span className="text-7xl ">BookFlow</span>
</div>
        <Slider/>
        <Genre/>
        <Story/>
        <Aboutus/>
        <Footer/>
      </div>
    
  )
}

export default App
