import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Service from "./components/pages/Service";
import Store from "./components/pages/Store";
import About from "./components/pages/About";
import Homepage from "./components/pages/Homepage";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        {/* <Route path="/chat" element={<Service />}></Route>
        <Route path="/teammember" element={<Store />}></Route> */}
        {/* <Route path="/about" element={<About />}></Route> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
