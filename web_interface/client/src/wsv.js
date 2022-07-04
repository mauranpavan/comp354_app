import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from './components/main-page/main-page';
import { Charts } from './components/chart-page/chart-page';
import { Stats } from './components/stats-page/stats-page';

export const WSV = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  )
}