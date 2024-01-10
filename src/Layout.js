import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

const Layout = ({ children }) => (
  <div className="App overflow-hidden" style={{ backgroundColor: "#000" }}>
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
