import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

import '../../sass/style.scss';

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = this.sidebarToggle.bind(this);
    this.state = {
      sidebarToggled: false
    }
  }

  sidebarToggle = () => {
    const doesShow = this.state.sidebarToggled
	  this.setState({sidebarToggled: !doesShow})
  }
    render() {
        return (
          <div id="page-top" className={this.state.sidebarToggled ? 'sidebar-toggled' : 'sidebar-untoggled'}>
              <Helmet
                title="Fantasy footbal ultimate thing"
              />
              
              <Header triggerhappy={this.sidebarToggle} />
              <div id="wrapper">
              <Sidebar toggled={this.state.sidebarToggled} />
                  <div id="content-wrapper">
                      {this.props.children()}
                  </div>
                  
                  <Footer />
              </div>
            </div>
        )
    }
}
TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
