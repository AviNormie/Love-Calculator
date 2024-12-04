import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoveCalculator from "./pages/LoveCalculator";


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoveCalculator/>} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>  {/* Wrap your routes in Routes component */}
    </BrowserRouter>
    </>
  )
}

export default App