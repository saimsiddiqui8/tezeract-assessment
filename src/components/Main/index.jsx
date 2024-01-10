import React from 'react';
import "./main.css";
import Form from '../../pages/Form';
import Table from '../../pages/Table';
import { Routes, Route } from 'react-router-dom';
function Main() {

    return (
        <main className='main-container'>
            <div className='main-title'>
            <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table />} />
      </Routes>
            </div>
        </main>
    )
}

export default Main;