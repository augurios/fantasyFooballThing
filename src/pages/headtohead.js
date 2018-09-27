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
		        	    record: "-",
			        	name: "",
			        	logo: "/img/DEF.png",
			        	currentstreak: "",
			        	highestwinstreak: "",
			        	highestlosestreak: "",
			        	totalpoints: "",
			        	netpoints: "",
			        	hightestscore: "",
			        	lowestscore: "",
			        	biggestwinmargin: "",
						smallestwinmargin: "",
		        	},
	        	this.state = {
					owners: [...this.props.data.allDataJson.edges[0].node.owners],
		        	teamA : {...this.initialTeam},
					teamB : {...this.initialTeam},
					gamesLength : false 
		        },
		        this.playedGames = []
	        }
	
	
	
	teamChangeHandler = (event) => {
	     var owners = [...this.state.owners]
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
			 this.setState({ gamesLength : true });
		 	const teamAlocal = {...this.state.teamA};
		 	const teamBlocal = {...this.state.teamB};
		 	
		 	const localplayedGames = [];
		 	const winsA = [];
		 	const winsB = [];
		 	
		 	// get matching games
		 	this.state.allGames.map((game,indi)=>{
			 	if (
					 (game.team_a[0].owner === teamAlocal.name || game.team_a[0].owner === teamBlocal.name)&&
					 (game.team_b[0].owner === teamAlocal.name || game.team_b[0].owner === teamBlocal.name)
					 ) {
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
			 teamAlocal.record = parseInt(winsA.length);
			 teamBlocal.record = parseInt(winsB.length);
			 

			 for(var ii = 0; ii < localplayedGames.length; ii++) {
					
				const week = localplayedGames[ii].week.split(" ");
				
				localplayedGames[ii].date = "01/"  + week[1] + "/" + parseInt(localplayedGames[ii].year);

			}

			localplayedGames.sort(function(a, b) {
				a = new Date(a.date);
				b = new Date(b.date);
				return a>b ? -1 : a<b ? 1 : 0;
			});
			 

		 	//stat
		 	const stat = (games, team) => {
				

				console.log('prop asdasd', games)

			    var i,
			        temp,
					winStreak = 0,
					lossStreak = 0,
					highMarginA = 0,
					highMarginB = 0,
					lowMarginA = 10000,
					lowMarginB = 10000,
			        length = games.length,
			        stats = {
				        highestStreak : 0,
				        lowestStreak: 0,
						currentStreak: 0,
						highestScore:0,
						lowestScore:10000,
						highestMargin:0,
						lowestMargin:10000,
						totalPoints:0,
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
							lowMarginA = parseInt(games[i].team_a[0].score) - parseInt(games[i].team_b[0].score);
							lowMarginB = parseInt(games[i].team_b[0].score) - parseInt(games[i].team_a[0].score);
							winStreak++;
							lossStreak = 0;
						} else if (games[i].team_a[0].owner === team.name && 
						 parseInt(games[i].team_a[0].score) < parseInt(games[i].team_b[0].score) 
						 	|| 
						 games[i].team_b[0].owner === team.name && 
						 parseInt(games[i].team_b[0].score) < parseInt(games[i].team_a[0].score)
						) {
							//check = ''
							lossStreak++;
							winStreak = 0;
						} else {
							lossStreak = 0;
							winStreak = 0;
						}
			       
					stats.currentStreak = winStreak;
			        // set the master stats var
			        if(winStreak > stats.highestStreak) {
			            stats.highestStreak = winStreak;
			            
			        }
			        
			        if(lossStreak > stats.lowestStreak) {
				        stats.lowestStreak = lossStreak
					}
					
					// Check Highest score
					if(parseInt(games[i].team_a[0].score) > stats.highestScore && games[i].team_a[0].owner === team.name) {
			            stats.highestScore = parseInt(games[i].team_a[0].score);
					}

					if(parseInt(games[i].team_b[0].score) > stats.highestScore && games[i].team_b[0].owner === team.name) {
			            stats.highestScore = parseInt(games[i].team_b[0].score);
			            
					}
					
					// Check lowest score 
					if(parseInt(games[i].team_a[0].score) < stats.lowestScore && games[i].team_a[0].owner === team.name) {
				        stats.lowestScore = parseInt(games[i].team_a[0].score);
					}
					
					if(parseInt(games[i].team_b[0].score) < stats.lowestScore && games[i].team_b[0].owner === team.name) {
				        stats.lowestScore = parseInt(games[i].team_b[0].score);
					}
					
					// Check Highest margin 
					highMarginA = parseInt(games[i].team_a[0].score) - parseInt(games[i].team_b[0].score);
					highMarginB = parseInt(games[i].team_b[0].score) - parseInt(games[i].team_a[0].score);

					if(highMarginA > stats.highestMargin && games[i].team_a[0].owner === team.name) {
			            stats.highestMargin = highMarginA;
					}

					if(highMarginB > stats.highestMargin && games[i].team_b[0].owner === team.name) {
			            stats.highestMargin = highMarginB;
					}

					// Check Lowest margin 
					if(lowMarginA < stats.lowestMargin && games[i].team_a[0].owner === team.name && lowMarginA > 0 ) {
			            stats.lowestMargin = lowMarginA;
					}

					if(lowMarginB < stats.lowestMargin && games[i].team_b[0].owner === team.name && lowMarginB > 0 ) {
			            stats.lowestMargin = lowMarginB;
					}

					if(games[i].team_a[0].owner === team.name) {
						stats.totalPoints+= parseInt(games[i].team_a[0].score);
					} 
					if(games[i].team_b[0].owner === team.name ) {
						
						stats.totalPoints+= parseInt(games[i].team_b[0].score);
						
					}
			        
			    }
			
			    return stats;
			}
			
			
			
			const teamAstreak = stat(localplayedGames.slice(0).reverse(),teamAlocal);
			
		 	teamAlocal.currentstreak = teamAstreak.currentStreak;
			teamAlocal.highestwinstreak = teamAstreak.highestStreak;
			teamAlocal.highestlosestreak = teamAstreak.lowestStreak;
			teamAlocal.highestScore = teamAstreak.highestScore;
			teamAlocal.lowestScore = teamAstreak.lowestScore;
			teamAlocal.highestMargin = teamAstreak.highestMargin;
			teamAlocal.lowestMargin = teamAstreak.lowestMargin;
			teamAlocal.totalPoints = teamAstreak.totalPoints;
		 	
		 	const teamBstreak = stat(localplayedGames.slice(0).reverse(),teamBlocal);
			
		 	teamBlocal.currentstreak = teamBstreak.currentStreak;
			teamBlocal.highestwinstreak = teamBstreak.highestStreak;
			teamBlocal.highestlosestreak = teamBstreak.lowestStreak;
			teamBlocal.highestScore = teamBstreak.highestScore;
			teamBlocal.lowestScore = teamBstreak.lowestScore;
			teamBlocal.highestMargin = teamBstreak.highestMargin;
			teamBlocal.lowestMargin = teamBstreak.lowestMargin;
			teamBlocal.totalPoints = teamBstreak.totalPoints;
			
			//total points	
			
			const getTotalPoints = (team) => {
				
				localplayedGames.map((game, indix) => {

				})
			} 
			
		 	
		 	this.setState({ teamA:teamAlocal  });
		 	this.setState({ teamB:teamBlocal  },()=>console.log("teamssss",teamAlocal, teamBlocal));
		 	
	 	} else {
			 console.log("no match");
			 this.setState({ gamesLength : false });
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
		const localOwners = [...this.state.owners];
		const simpleNames = []
		const allGames = this.state.allGames;
		const allGamesPlayers = [];
		allGames.map((game, index) => {
			allGamesPlayers.push(game.team_a[0].owner)
			allGamesPlayers.push(game.team_b[0].owner)
		})

		localOwners.map((dude,index) => {
			simpleNames.push(dude.name);
		})

		const uniqueNames = allGamesPlayers.filter((val,id,array) => array.indexOf(val) == id);
		
		uniqueNames.map((name, index) => {
				if(simpleNames.indexOf(name) === -1 ) {
					localOwners.push({
						fantasyname: "inactive",
						image: "/img/DEF.png",
						name: name,
						waiver: "-"
					});
				} 
		})
		this.setState({ owners:localOwners  })
  	}
	        
  	render() {
		  console.log('games l', this.state);
		 return (
		   <main className="container-fluid headtohead">
		    	<Breadcrumb title="Head to Head"/>
			    
			    <div className="row">
					<div className="col-lg-7">
							<Headtohead 
								owners={this.state.owners} 
								triggerhappy={(event)=> this.teamChangeHandler(event)}
								teama={this.state.teamA}
								teamb={this.state.teamB}
								games={this.state.gamesLength}
							/>
					</div>
					<div className="col-lg-5">
							<Gamelogs data={this.state.playedGames} />
					</div>
				</div>
			   
			    
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
