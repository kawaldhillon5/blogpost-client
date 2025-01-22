import React, { useEffect, useRef, useState } from 'react';
import { Form, NavLink } from 'react-router-dom';

import { FaBars} from 'react-icons/fa';
import './expandable-header-menu.css'; 
import {  FaXmark } from 'react-icons/fa6';
import Notifications from '../notifications';

const MobileMenu = ({ user, handleLogIn, location }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.querySelector('#root').addEventListener('mousedown', handleClickOutside);
    return () => {
      document.querySelector('#root').removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
        <button className="menu-toggle" onClick={toggleMenu}>   
                {!isMenuOpen ? <FaBars /> : < FaXmark />} 
        </button>
        <div className={`mobile-menu-container ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
            <div className="menu-header">
                {user && <span className="username">{user.username}</span>} 
                {user ? (
                <Form method="post">
                    <button type="submit">Log Out</button>
                    <input type="hidden" name="previousLocation" value={JSON.stringify(location.pathname || '/')} />
                </Form>
                ) : (
                <button onClick={handleLogIn}>Log In</button>
                )}
            </div>
            <div className="menu-links">
                <NavLink 
                to={`/editor/myBlogs`} 
                className={({ isActive, isPending }) => 
                    isActive ? 'active' : isPending ? 'pending' : ''
                }
                >
                My Blogs
                </NavLink>
                <NavLink 
                to={`/client/allBlogPosts`} 
                className={({ isActive, isPending }) => 
                    isActive ? 'active' : isPending ? 'pending' : ''
                }
                >
                Blogs
                </NavLink>
                <NavLink 
                to={`/client/allBlogRequests`} 
                className={({ isActive, isPending }) => 
                    isActive ? 'active' : isPending ? 'pending' : ''
                }
                >
                Blog Requests
                </NavLink>
                <NavLink 
                to={`/editor/about`} 
                className={({ isActive, isPending }) => 
                    isActive ? 'active' : isPending ? 'pending' : ''
                }
                >
                About
                </NavLink>
            </div>
            <Notifications user={user}/>
        </div>
    </>
  );
};

export default MobileMenu;