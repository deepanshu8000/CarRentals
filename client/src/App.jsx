import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';

const App = () => {
  const[showLogin, setShowLogin]=useState(false);   /*navbar visible to all pages*/
  const isOwnerPath=useLocation().pathname.startsWith('/owner') /* hide navbar from owner dashboard */
  return (
    <>
     {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/> /*navbar visible to all pages except owner dashboard*/}
     <Routes>
        <Route path='/' element={<Home/>}/> {/*To move from one pages to another */}
       <Route path='/car-details/:id' element={<CarDetails />} />
      <Route path='/cars' element={<Cars />} />
       <Route path='/my-bookings' element={<MyBookings />} />
     </Routes>
      {!isOwnerPath &&<Footer/>}
    </>
  )
}

export default App  