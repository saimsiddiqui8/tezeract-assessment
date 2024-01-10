import React from 'react';
import "./sidebar.css";
import { MdOutlineFormatListBulleted } from 'react-icons/md'
import { BsGrid1X2Fill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const location = useLocation();

    const isRouteActive = (route) => {
        return location.pathname === route;
    };

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    Tezeract
                </div>
                <span className='icon close_icon mt-3' onClick={OpenSidebar}>X</span>
            </div>
            <div className="container">
                <ul className='sidebar-list'>
                    <NavLink  to="/">
                        <li className={`sidebar-list-item ${isRouteActive('/') ? 'active-link' : ''}`}>
                            <a>
                                <MdOutlineFormatListBulleted className='icon' /> User Form
                            </a>
                        </li>
                    </NavLink >
                    <NavLink  to="/table">
                        <li className={`sidebar-list-item ${isRouteActive('/table') ? 'active-link' : ''}`}>
                            <a>
                                <BsGrid1X2Fill className='icon mb-1' /> User Table
                            </a>
                        </li>
                    </NavLink >
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar