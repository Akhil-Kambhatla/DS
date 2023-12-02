import React from 'react'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import {Routes,Route } from 'react-router-dom';
import Timeline from '../pages/timeline';
import ManageEvents from '../pages/ManageEvents';
import ManageUsers from '../pages/ManageUsers';
import CommentForm from '../pages/CommentForm';


const Home = ({isAuthenticated}) => {
  return (
    <div>
        <Navbar isAuthenticated={isAuthenticated}/>
    
    <div style={{marginTop:'80px'}}>

        <Routes>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/createvnt' element={<Timeline/>}/>
            <Route path='/myevnts' element={<CommentForm/>}/>

            <Route path='/managevnt' element={<ManageEvents/>}/>
            <Route path='/manageusers' element={<ManageUsers/>}/>

        </Routes>
        
    </div>
    </div>
  )
}

export default Home