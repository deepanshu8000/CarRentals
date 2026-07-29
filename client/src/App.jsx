import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';
import Layout from './pages/owner/Layout';
import AddCar from './pages/owner/AddCar';
import Dashboard from './pages/owner/Dashboard';
import ManageCar from './pages/owner/ManageCar';
import ManageBooking from './pages/owner/ManageBooking';


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
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCar/>}/>
          <Route path='manage-bookings' element={<ManageBooking/>}/>        
        </Route>
        
      
     </Routes>
      {!isOwnerPath &&<Footer/>}
    </>
  )
}

export default App  