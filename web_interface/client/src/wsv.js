import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from './components/main-page/main-page';
import { Charts } from './components/chart-page/chart-page';

export const WSV = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </>
  )
}