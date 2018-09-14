import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
library.add(faTachometerAlt)
library.add(faFolder)
library.add(faChartArea)
library.add(faTable)
import './_sidebar.scss';

const Sidebar = () =>
  (<ul className="sidebar navbar-nav toggled">
        <li className="nav-item ">
        <NavLink to="/index.html" className="nav-link" activeClassName="active">
			<FontAwesomeIcon icon="tachometer-alt" />
            <span>Overview</span>
        </NavLink>
        
        </li>
        
        <li className="nav-item">
           <NavLink to="/headtohead/" className="nav-link" activeClassName="active">
            <FontAwesomeIcon icon="chart-area"/>
            <span>Head to Head</span>
           </NavLink>
        </li>
        <li className="nav-item">
	        <NavLink to="/standings/" className="nav-link" activeClassName="active">
	            <FontAwesomeIcon icon="table"/>
	            <span>Standings</span>
	       </NavLink>
	    </li>
      </ul>);

export default Sidebar;
