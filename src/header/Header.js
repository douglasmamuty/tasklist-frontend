import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream } from '@fortawesome/free-solid-svg-icons'

function Header() {  
  return (    
    <div className="container">
        <div className="header-container" >
            <h1><FontAwesomeIcon icon={faStream} /> Task List</h1>            
        </div>
    </div>    
  );
}

export default Header;


