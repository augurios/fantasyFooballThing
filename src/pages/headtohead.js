/* global graphql */

import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import Headtohead from '../components/headtohead';
import Gamelogs from '../components/gamelogs';


class IndexPage extends React.Component {
	
	constructor(props) {
	        	super(props);
	        	this.teamChangeHandler = this.teamChangeHandler.bind(this);
	        	this.matchTeams = this.matchTeams.bind(this);
	        	this.allGames = [],
	        	this.initialTeam = {
			        	name: "",
			        	currentstreak: "",
			        	highestwinstreak: "",
			        	highestlosestreak: "",
			        	totalpoints: "",
			        	netpoints: "",
			        	hightestscore: "",
			        	lowest: "",
			        	biggestwinmargin: "",
						smallestwinmargin: "",
		        	},
	        	this.state = {
		        	teamA : {...this.initialTeam},
		        	teamB : {...this.initialTeam}
		        },
		        this.playedGames = []
	        }
	
	
	
	teamChangeHandler = (event) => {
	     var owners = this.props.data.allDataJson.edges[0].node.owners
	     console.log('event', event.target.name);
		 //find index on state's object by ID
		 const newOwner = owners.findIndex(owners => {
			  return owners.name === event.target.value;
		  });
		 
		 // update actual state with modified object
		 if (event.target.name === "teama") {
			 
			 const curTeam = {...this.state.teamA};
			 if (owners[newOwner]) {
				 curTeam.name = owners[newOwner].name
				 this.setState(
				 	{ teamA:curTeam  },
					 	() => this.matchTeams()
				 )
			 } else {
				 this.setState(
				 	{ teamA:{...this.initialTeam}  },
					 	() => this.matchTeams()
				 )
			 }
			 
			 
		 } else {
			 const curTeam = {...this.state.teamB};
			 if (owners[newOwner]) {
				 curTeam.name = owners[newOwner].name
				 this.setState(
				 	{ teamB:curTeam  },
					 	() => this.matchTeams()
				 )
			 } else {
				 this.setState(
				 	{ teamB:{...this.initialTeam}  },
					 	() => this.matchTeams()
				 )
			 }
		 }
		 
		 
		 
	}
	 
	matchTeams = () => {
		console.log("Matching teams", this.state);
	 	if(this.state.teamA.name && this.state.teamB.name) {
		 	console.log("matched");
		 	var localplayedGames = [];
		 	this.state.allGames.map((game,indi)=>{
			 	if ((game.team_a[0].owner === this.state.teamA.name || game.team_a[0].owner === this.state.teamB.name)&&(game.team_b[0].owner === this.state.teamA.name || game.team_b[0].owner === this.state.teamB.name)) {
				 	localplayedGames.push(game);
			 	}
		 	})
		 	this.setState({ playedGames:localplayedGames  },() => console.log("played games", this.state.playedGames));
		 	
		 	
	 	} else {
		 	console.log("no match");
	 	}
	}
	
	componentWillMount() {
		const years = this.props.data.allDataJson.edges[0].node.years;
		var games = [];
		years.map((year, index) => {
			year.weeks_games.map((week, inde) => {
				games.push(...week.games);
			})
		})
		this.setState({ allGames:games  })
		
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
						triggerhappy={(event)=> this.teamChangeHandler(event)}
						teama={this.state.teamA}
						teamb={this.state.teamB}
			    	/>
			    </div>
			    <Gamelogs data={this.state.playedGames} />
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
