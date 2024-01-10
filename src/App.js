import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Header from './components/Header';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle((prevState) => !prevState);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={toggleSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={toggleSidebar} />
      <Main />
    </div>
  );
}

export default App;
