/* global graphql */

import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import Headtohead from '../components/headtohead';
import Gamelogs from '../components/gamelogs';


class IndexPage extends React.Component {
	constructor(props) {
	        	super(props);
	        	this.teamChangeHandlerA = this.teamChangeHandlerA.bind(this);
	        	this.teamChangeHandlerB = this.teamChangeHandlerB.bind(this);
	        	this.state = {
		        	teamA : {},
		        	teamB : {}
		        }
	        }
	        
	teamChangeHandlerA = (event) => {
	     var teams = this.props.data.allDataJson.edges[0].node.teams
		 //find index on state's object by ID
		 const newTeam = teams.findIndex(team => {
			  return team.name === event.target.value;
		  });
		 
		 // update actual state with modified object
		 this.setState(
		 	{ teamSelected: teams[newTeam] },
		 	() => this.loadChart()
		 )
		 
		 
	  }  
	  
	 teamChangeHandlerB = (event) => {
	     var teams = this.props.data.allDataJson.edges[0].node.teams
		 //find index on state's object by ID
		 const newTeam = teams.findIndex(team => {
			  return team.name === event.target.value;
		  });
		 
		 // update actual state with modified object
		 this.setState(
		 	{ teamSelected: teams[newTeam] },
		 	() => this.loadChart()
		 )
		 
		 
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
			    	<Headtohead 
			    		owners={this.props.data.allDataJson.edges[0].node.owners} 
						triggera={}
			    	/>
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
        owners {
          name
          waiver
          image
          fantasyname
        }
				years{
          weeks_games {
            games {
              week
              team_a {
                team
                team_url
                owner
                logo
                score
                record
                streak
                waiver
                bench_total
              }
              team_b {
                name
                url
                owner
                logo
                score
                record
                streak
                waiver
                bench_points
              }
              year
            }
          }
        }
      } 
    }
  }
}
`;
