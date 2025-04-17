import React from 'react';
import Navbar from './Components/Navbar';
import Tab from './Components/Tab';
import TextArea from './Components/TextArea';
import About from './Components/about'

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter> 
        <Navbar title="TEXT" home="Tools" tool="About" />
        <Tab />
        <Routes>
          <Route path="/" element={<TextArea />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
