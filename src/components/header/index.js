import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)
library.add(faSearch)
import './_header.scss';

const Header = (props) =>
  ( <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <a className="navbar-brand mr-1" href="index.html">FFU Stats Thing</a>
        <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#"  onClick={props.triggerhappy}>
          <FontAwesomeIcon icon="bars" />
        </button>
        {/* Navbar Search */}
        
      </nav>);

export default Header;
