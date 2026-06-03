import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import Mybookings from './pages/Mybookings';

const App = () => {
  const[showLogin, setShowLogin]=useState(false);   /*navbar visible to all pages*/
  const isOwnerPath=useLocation().pathname.startsWith('/owner') /* hide navbar from owner dashboard */
  return (
    <>
     {!isOwnerPath &&<Navbar setShowLogin={setShowLogin}/> /*navbar visible to all pages except owner dashboard*/}
     <Routes>
        <Route path='/' element={<Home/>}/> {/*To move from one pages to another */}
        <Route path='/Car-details/:id' element={<CarDetails/>}/>
        <Route path='/Cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<Mybookings/>}/>
     </Routes>
    </>
  )
}

export default App  