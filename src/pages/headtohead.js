/* global graphql */

import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import Headtohead from '../components/headtohead';
import Gamelogs from '../components/gamelogs';


class IndexPage extends React.Component {
	constructor(props) {
	        	super(props);
	        	this.state = {
		        	
		        }
	        }
	        
	
	
	
	componentWillMount() {
		
		
  	}        
  	
  	componentDidMount() {
  	}
	        
  	render() {
	  	console.log("props", this.props)
		 return (
		   <main className="container-fluid">
		    	<Breadcrumb title="Head to Head"/>
			    <div className="container-fluid">
			    	<Headtohead data={this.props.data.allDataJson.edges[0].node.owners}/>
			    </div>
			    <Gamelogs />
		   </main>);
	}
}
export default IndexPage;

export const pageQuery = graphql`
  query HeadtoheadQuery {
  allDataJson {
    edges {
      node {
	       owners{
	        name
	        waiver
	        image
	        fantasyname
	      }
      } 
    }
  }
}
`;
