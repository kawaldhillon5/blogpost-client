import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './floatingButton.css'; 
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import Cta from '../CTA';

const FloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
 const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  }; 
  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
      document.querySelector('#root').addEventListener('mousedown', handleClickOutside);
      return () => {
        document.querySelector('#root').removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div className={`floating-button-container`} ref={menuRef}>
        <div className={`call-to-action-mobile ${isExpanded? "ctaExpanded": ''}`}>
            {isExpanded && <Cta />}
        </div>
        <button 
            className={`floating-button ${isExpanded ? 'rotate': ''}`} 
            onClick={handleButtonClick}
        >
            <span className="plus-icon"><FontAwesomeIcon icon={faPlus} /></span>
        </button>
    </div>
  );
};

export default FloatingButton;