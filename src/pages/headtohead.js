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
		        	    record: "",
			        	name: "",
			        	logo: "",
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
				 curTeam.logo = owners[newOwner].image
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
				 curTeam.logo = owners[newOwner].image
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
		 	const teamAlocal = {...this.state.teamA};
		 	const teamBlocal = {...this.state.teamB};
		 	
		 	const localplayedGames = [];
		 	const winsA = [];
		 	const winsB = [];
		 	
		 	// get matching games
		 	this.state.allGames.map((game,indi)=>{
			 	if ((game.team_a[0].owner === teamAlocal.name || game.team_a[0].owner === teamBlocal.name)&&(game.team_b[0].owner === teamAlocal.name || game.team_b[0].owner === teamBlocal.name)) {
				 	localplayedGames.push(game);
			 	}
		 	})
		 	this.setState({ playedGames:localplayedGames  },() => console.log("played games", this.state.playedGames));
		 	
		 	// get winners
		 	
		 	localplayedGames.map((game,indi)=>{
				 	if(
						(game.team_a[0].owner === teamAlocal.name && 
						 parseInt(game.team_a[0].score) > parseInt(game.team_b[0].score) 
						 	|| 
						 game.team_b[0].owner === teamAlocal.name && 
						 parseInt(game.team_b[0].score) > parseInt(game.team_a[0].score)
						 ) 
					) {
						winsA.push(game);
					} else if(
						(game.team_a[0].owner === teamBlocal.name && 
						 parseInt(game.team_a[0].score) > parseInt(game.team_b[0].score) 
						 	|| 
						 game.team_b[0].owner === teamBlocal.name && 
						 parseInt(game.team_b[0].score) > parseInt(game.team_a[0].score)
						 ) 
					) {
						winsB.push(game);
					}
			})
		 	
		 	
		 	// map new values
		 	teamAlocal.record = parseInt(winsA.length) + " - " + localplayedGames.length;
		 	teamBlocal.record = parseInt(winsB.length) + " - " + localplayedGames.length;
		 	
		 	//streaks
		 	const streak = (games, team) => {
			    var i,
			        temp,
			        streak = 0,
			        loss = 0,
			        length = games.length,
			        streaks = {
				        highestStreak : 0,
				        lowestStreak: 0,
				        current: 0,
			        }
			        
			    for(i = 0; i < length; i++) {
				    var check;
			        // check the value of the current entry against the last
			        if (games[i].team_a[0].owner === team.name && 
						 parseInt(games[i].team_a[0].score) > parseInt(games[i].team_b[0].score) 
						 	|| 
						 games[i].team_b[0].owner === team.name && 
						 parseInt(games[i].team_b[0].score) > parseInt(games[i].team_a[0].score)
						) {
							//check = 1,
							streak++;
							loss = 0;
						} else if (games[i].team_a[0].owner === team.name && 
						 parseInt(games[i].team_a[0].score) < parseInt(games[i].team_b[0].score) 
						 	|| 
						 games[i].team_b[0].owner === team.name && 
						 parseInt(games[i].team_b[0].score) < parseInt(games[i].team_a[0].score)
						) {
							//check = ''
							loss++;
							streak = 0;
						} else {
							loss = 0;
							streak = 0;
						}
			       
			        
					streaks.current = streak;
			        // set the master streak var
			        if(streak > streaks.highestStreak) {
			            streaks.highestStreak = streak;
			            
			        }
			        
			        if(loss > streaks.lowestStreak) {
				        streaks.lowestStreak = loss
				    }
			        
			        
			    }
			
			    return streaks;
			}
			
			
			
			const teamAstreak = streak(localplayedGames.slice(0).reverse(),teamAlocal);
			
		 	teamAlocal.currentstreak = teamAstreak.current;
			teamAlocal.highestwinstreak = teamAstreak.highestStreak;
			teamAlocal.highestlosestreak = teamAstreak.lowestStreak;
		 	
		 	const teamBstreak = streak(localplayedGames.slice(0).reverse(),teamBlocal);
			
		 	teamBlocal.currentstreak = teamBstreak.current;
			teamBlocal.highestwinstreak = teamBstreak.highestStreak;
			teamBlocal.highestlosestreak = teamBstreak.lowestStreak;
			
			//total points	
			
			const getTotalPoints = (team) => {
				
				localplayedGames.map((game, indix) => {
					
				})
			} 
			
		 	
		 	this.setState({ teamA:teamAlocal  });
		 	this.setState({ teamB:teamBlocal  },()=>console.log("teamssss",teamAlocal, teamBlocal));
		 	
	 	} else {
		 	console.log("no match");
		 	 this.setState(
				 	{ playedGames:[]  }
				 )
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
	  	console.log("props", this.props.data.allDataJson.edges[0].node)
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
