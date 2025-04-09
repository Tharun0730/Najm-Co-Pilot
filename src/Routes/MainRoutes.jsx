
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../pages/mainLayout'


export default function MainRoute() {
  return (


    <BrowserRouter> 

    <Routes>
        <Route path='/' element={<AppLayout/>}/>
        
    </Routes>
    </BrowserRouter>




  )
}
