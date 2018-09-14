import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

import '../../sass/style.scss';

const TemplateWrapper = ({ children }) => (
  <div id="page-top" className="sidebar-toggled">
    <Helmet
      title="Fantasy footbal ultimate thing"
    />
    
    <Header />
    <div id="wrapper">
	  <Sidebar />
    		<div id="content-wrapper">
			    {children()}
			    
		    </div>
		    
		    <Footer />
		</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
