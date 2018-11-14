/* global graphql */

import React from 'react';
import TeamStats from '../components/team-stats';
import Performance from '../components/Performance';
import Chart from '../components/chart';
import Breadcrumb from '../components/breadcrumb';
import { isNullOrUndefined } from 'util';


class IndexPage extends React.Component {
	constructor(props) {
	        	super(props);
	        	this.teamChangeHandler = this.teamChangeHandler.bind(this);
	        	this.rate = this.rate.bind(this);
						this.loadChart = this.loadChart.bind(this);
						this.loadTeamData = this.loadTeamData.bind(this);
	        	this.state = {
		        	teamSelected: {},
							allTeams: [],
							allGames : [],
		        	dataSet : {
				      label: "Wins",
				      lineTension: 0.3,
				      backgroundColor: "rgba(2,117,216,0.2)",
				      borderColor: "rgba(2,117,216,1)",
				      pointRadius: 5,
				      pointBackgroundColor: "rgba(2,117,216,1)",
				      pointBorderColor: "rgba(255,255,255,0.8)",
				      pointHoverRadius: 5,
				      pointHoverBackgroundColor: "rgba(2,117,216,1)",
				      pointHitRadius: 50,
				      pointBorderWidth: 1,
				      data: [],
				    }
		        }
	        }
	        
	
	teamChangeHandler = (event) => {
			 var teams = this.props.data.allDataJson.edges[0].node.owners;
			 
		 //find index on state's object by ID
		 var splitit = event.target.value.split(" ");
		 var newTeam = 0;

		 if (splitit[1] === '(inactive)') {
				// update actual state with modified object
				var	teaminner = { name: splitit[0],
													image: "/img/DEF.png",
												 }
				this.setState(
					{ teamSelected: this.loadTeamData(teaminner, this.state.allGames) },
					() => this.loadChart()
				)
		 } else {
				  newTeam = teams.findIndex(team => {
					return team.name === event.target.value;
				});

				// update actual state with modified object
				this.setState(
					{ teamSelected: this.loadTeamData(teams[newTeam],this.state.allGames) },
					() => this.loadChart()
				)
		 }

			
	  }  
    
    rate = (win,loss,tie) => {
	     var totalOGames = parseInt(win) + parseInt(loss) + parseInt(tie);
		 	 var winPercent = 100 * parseInt(win);
		 	 return Math.round(winPercent / totalOGames) ;	
		}
		
		loadTeamData = (team, games) => {
			
			//stats build uppon scraped data collection
			var teamObject = team;
			var teamGames = [];
			var gamesByYear = [];
			var playOffWeeks = [];
			var TeamPlayOffGames = [];
			var TeamPlayOffYears = 0;

			games.map((game) => {
				if ((game.team_a["0"].owner === team.name || game.team_b["0"].owner === team.name)) {
					teamGames.push(game);
				}
			})

			// get games by years and weeks

			games.map((game) => {
					if(gamesByYear.find(obj => obj.year === game.year)) {
							var currentYear = gamesByYear.find(obj => obj.year === game.year)
								if (currentYear.weeks.find(obj => obj.week === game.week)) {
									
									var currentWeek = currentYear.weeks.find(obj => obj.week === game.week)
									
										currentWeek.games.push(game);

								} else {
									currentYear.weeks.push({
										week: game.week,
										games: [game]
									})
								}
						
					} else {
						gamesByYear.push({
								year: game.year,
								weeks: [{
									week: game.week,
									games: [game]
								}]
						});
					}
			})

			// mark the playoff weeks and populate array

			gamesByYear.map((year) => {
				var gamesChecker = 0;
				year.weeks.map((week) => {
					if (gamesChecker === 0) {
							gamesChecker = week.games.length;
					} else if (week.games.length < gamesChecker) {
							week.isPlayoff = true;
							playOffWeeks.push(week)
					}
				});
			});
			
			// get team's playoff games

			playOffWeeks.map((week) => {
					week.games.map((game) => {
							if (game.team_a['0'].owner === team.name || game.team_b['0'].owner === team.name) {
									TeamPlayOffGames.push(game);
							}
					});
			});

			TeamPlayOffGames.map((game,index) => {
				if(isNullOrUndefined(TeamPlayOffGames[index-1]) ) {
					TeamPlayOffYears++;
				} else{
					if(game.year === TeamPlayOffGames[index-1].year) {

					} else {
						TeamPlayOffYears++;
					}
				} 
			})


			teamObject.playoffAppearances = TeamPlayOffYears;

			// get playoff stats



			teamObject.championshipAppearance = 0;
			teamObject.championshipWins = 0;
			teamObject.championshipLoses = 0;
			teamObject.championshipTies = 0;
			teamObject.playOffWins = 0;
			teamObject.playOffLoses = 0;
			teamObject.playOffTies = 0;

			TeamPlayOffGames.map((game) => {
				

					if (game.team_a['0'].owner === team.name || game.team_b['0'].owner === team.name) {
								if(game.week === "Week 16") {
									teamObject.championshipAppearance++;
								}

								if (
									(parseInt(game.team_a[0].score) > parseInt(game.team_b[0].score)) && game.team_a[0].owner === team.name ||
									(parseInt(game.team_b[0].score) > parseInt(game.team_a[0].score)) && game.team_b[0].owner === team.name
								)  {
										teamObject.playOffWins++
										if(game.week === "Week 16") {
											teamObject.championshipWins++
										}
								} else if (parseInt(game.team_b[0].score) === parseInt(game.team_a[0].score)) {
									teamObject.playOffTies++
								} else {
									teamObject.playOffLoses++
								}
						}
					
			});
			
			//find year of first occurance

			for(var ii = 0; ii < teamGames.length; ii++) {
				const week = teamGames[ii].week.split(" ");
				teamGames[ii].date = "01/"  + week[1] + "/" + parseInt(games[ii].year);
			}
			
			var nikcindex = teamGames.findIndex((game) => {

					if (game.team_a["0"].owner === team.name || game.team_b["0"].owner === team.name) {
						return game.year;
					}
					
			});

			if (teamGames[nikcindex].team_a['0'].owner === team.name) {
				 if (teamGames[nikcindex].team_a['0'].team) {
					teamObject.nickname =	teamGames[nikcindex].team_a['0'].team
				 } else {
					teamObject.nickname =	teamGames[nikcindex].team_a['0'].name
				 }
					
			} else if(teamGames[nikcindex].team_b['0'].owner === team.name) {
				if (teamGames[nikcindex].team_b['0'].team) {
					teamObject.nickname =	teamGames[nikcindex].team_b['0'].team
				 } else {
					teamObject.nickname =	teamGames[nikcindex].team_b['0'].name
				 }
			}
			
			teamGames.sort(function(a, b) {
				a = new Date(a.date);
				b = new Date(b.date);
				return a>b ? -1 : a<b ? 1 : 0;
			});

			teamGames.reverse();
			
			var gameindex = teamGames.findIndex(game => {
					if (game.team_a["0"].owner === team.name || game.team_b["0"].owner === team.name) {
						return game.year;
					}
					
			});
			
			teamObject.founded = teamGames[gameindex].year;

			// yearly history build up 

			var yearly = [];
			teamObject.totalWins = 0;
			teamObject.totalLoses = 0;
			teamObject.totalTies = 0;
			teamGames.map((game) => {
				
							if (
								(parseInt(game.team_a[0].score) > parseInt(game.team_b[0].score)) && game.team_a[0].owner === team.name ||
								(parseInt(game.team_b[0].score) > parseInt(game.team_a[0].score)) && game.team_b[0].owner === team.name
							) {
								teamObject.totalWins++;
									if(yearly.find(obj => obj.year === parseInt(game.year))) {
										 yearly.map((yearsg,indi) => {
											  if(yearsg.year === parseInt(game.year)) {
													yearly[indi].wins++
												}
										 })
									} else {
										yearly.push({
											year: parseInt(game.year),
											wins: 1,
										});
									}
							} else if(parseInt(game.team_a[0].score) === parseInt(game.team_b[0].score)){
								teamObject.totalTies++;
							} else {
								teamObject.totalLoses++;
							}
			})

			teamObject.yearly = yearly.sort((a, b) => a.year - b.year);

			var yearsActive =[];
			yearly.map((year) => {
					yearsActive.push(year.year);
			}) 
			teamObject.yearsActive = yearsActive.sort((a, b) => a - b);
			
			// number of seasons
			teamObject.seasons = yearly.length;

			// logo 
			teamObject.logo = team.image

			// current stats 
			teamObject.winStreak = 0,
			teamObject.lossStreak = 0,
			teamObject.lossStreak = 0,
			teamObject.highMarginA = 0,
			teamObject.highMarginB = 0,
			teamObject.lowMarginA = 10000,
			teamObject.lowMarginB = 10000,
			teamObject.stats = {
				      highestStreak : 0,
				      lowestStreak: 0,
							currentStreak: 0,
							highestScore:0,
							lowestScore:10000,
							highestMargin:0,
							lowestMargin:10000,
							totalPoints:0,
							totalPointsAgainst:0,
			}

			teamGames.map((game, inde) => {
				var check;
			        // check the value of the current entry against the last
			     if (game.team_a[0].owner === team.name && 
						 parseInt(game.team_a[0].score) > parseInt(game.team_b[0].score) 
						 	|| 
						 game.team_b[0].owner === team.name && 
						 parseInt(game.team_b[0].score) > parseInt(game.team_a[0].score)
						) {
							//check = 1,
							teamObject.lowMarginA = parseInt(game.team_a[0].score) - parseInt(game.team_b[0].score);
							teamObject.lowMarginB = parseInt(game.team_b[0].score) - parseInt(game.team_a[0].score);
							teamObject.winStreak++;
							teamObject.lossStreak = 0;
						} else if (game.team_a[0].owner === team.name && 
						 parseInt(game.team_a[0].score) < parseInt(game.team_b[0].score) 
						 	|| 
						 game.team_b[0].owner === team.name && 
						 parseInt(game.team_b[0].score) < parseInt(game.team_a[0].score)
						) {
							//check = ''
							teamObject.lossStreak++;
							teamObject.winStreak = 0;
						} else {
							teamObject.lossStreak = 0;
							teamObject.winStreak = 0;
						}
			       
						teamObject.stats.currentStreak = teamObject.winStreak;
			        // set the master stats var
			        if(teamObject.winStreak > teamObject.stats.highestStreak) {
								teamObject.stats.highestStreak = teamObject.winStreak;
			            
			        }
			        
			        if(teamObject.lossStreak > teamObject.stats.lowestStreak) {
				        teamObject.stats.lowestStreak = teamObject.lossStreak
					}
					
					// Check Highest score
					if(parseInt(game.team_a[0].score) > teamObject.stats.highestScore && game.team_a[0].owner === team.name) {
						teamObject.stats.highestScore = parseInt(game.team_a[0].score);
					}

					if(parseInt(game.team_b[0].score) > teamObject.stats.highestScore && game.team_b[0].owner === team.name) {
						teamObject.stats.highestScore = parseInt(game.team_b[0].score);   
					}
					
					// Check lowest score 
					if(parseInt(game.team_a[0].score) < teamObject.stats.lowestScore && game.team_a[0].owner === team.name) {
						teamObject.stats.lowestScore = parseInt(game.team_a[0].score);
					}
					
					if(parseInt(game.team_b[0].score) < teamObject.stats.lowestScore && game.team_b[0].owner === team.name) {
						teamObject.stats.lowestScore = parseInt(game.team_b[0].score);
					}
					
					// Check Highest margin 
					teamObject.highMarginA = parseInt(game.team_a[0].score) - parseInt(game.team_b[0].score);
					teamObject.highMarginB = parseInt(game.team_b[0].score) - parseInt(game.team_a[0].score);

					if(teamObject.highMarginA > teamObject.stats.highestMargin && game.team_a[0].owner === team.name) {
									teamObject.stats.highestMargin = teamObject.highMarginA;
					}

					if(teamObject.highMarginB > teamObject.stats.highestMargin && game.team_b[0].owner === team.name) {
							teamObject.stats.highestMargin = teamObject.highMarginB;
					}

					// Check Lowest margin 
					if(teamObject.lowMarginA < teamObject.stats.lowestMargin && game.team_a[0].owner === team.name && teamObject.lowMarginA > 0 ) {
								teamObject.stats.lowestMargin = teamObject.lowMarginA;
					} 

					if(teamObject.lowMarginB < teamObject.stats.lowestMargin && game.team_b[0].owner === team.name && teamObject.lowMarginB > 0 ) {
								teamObject.stats.lowestMargin = teamObject.lowMarginB;
					} 

					if(game.team_a[0].owner === team.name) {
								teamObject.stats.totalPoints+= parseInt(game.team_a[0].score);
								teamObject.stats.totalPointsAgainst+= parseInt(game.team_b[0].score);
								
					} 
					
					if(game.team_b[0].owner === team.name ) {
								teamObject.stats.totalPoints+= parseInt(game.team_b[0].score);
								teamObject.stats.totalPointsAgainst+= parseInt(game.team_a[0].score);
								
						
					}
			})
			teamObject.averageScore = teamObject.stats.totalPoints/teamGames.length;
			teamObject.averageScoreAgaints = teamObject.stats.totalPointsAgainst/teamGames.length;

			//console.log(' loaded team data ', teamObject);
			return teamObject

		}
    
    loadChart = () => {
	    const dataSetCopy = { ...this.state.dataSet};
			dataSetCopy.data = []
			for(var i = 0; i < this.state.teamSelected.yearly.length; i++) {
				dataSetCopy.data.push(this.state.teamSelected.yearly[i].wins)
			}
		
			this.setState({dataSet: dataSetCopy})
    }
	
	componentWillMount() {
				const source = this.props.data.allDataJson.edges[0].node.owners;
				var team = this.state.teamSelected;
				var teams = [];
				for(var i = 0; i < source.length; i++) {
					teams.push(source[i].name);
				}
				team = source[0];

				const years = this.props.data.allDataJson.edges[0].node.years;
				var games = [];
				years.map((year, index) => {
					year.weeks_games.map((week, inde) => {
						games.push(...week.games);
					})
				})
				this.setState({ allGames:games  })
				this.setState({allTeams: teams})
				this.setState({teamSelected: this.loadTeamData(team,games)})
				console.log('will mount', this.state.teamSelected );
  	}        
  	
  	componentDidMount() {
			const localOwners = [...this.state.allTeams];
			const allGames = this.state.allGames;
			const allGamesPlayers = [];
			allGames.map((game, index) => {
				allGamesPlayers.push(game.team_a[0].owner)
				allGamesPlayers.push(game.team_b[0].owner)
			})

			const uniqueNames = allGamesPlayers.filter((val,id,array) => array.indexOf(val) == id);
			
			uniqueNames.map((name, index) => {
					if(localOwners.indexOf(name) === -1 ) {
						localOwners.push(name + " (inactive)");
					} 
			})
			this.setState({ allTeams:localOwners  })
			this.setState({teamSelected: this.loadTeamData(this.state.teamSelected,allGames)})
			//console.log('did mount', this.state.allTeams, localOwners );

	  	this.loadChart();
  	}
	        
  	render() {
			//console.log('props', this.props, this.state);
			


	  	const chartData = {
		  	 labels: this.state.teamSelected.yearsActive,
		  	 datasets: [this.state.dataSet]
	  	}
		 return (
		   <main className="container-fluid">
		    	<Breadcrumb title="Franchise Stats"/>
			    <TeamStats data={this.state.teamSelected} teams={this.state.allTeams} change={(event) => this.teamChangeHandler(event)} />
			    <Performance 
			      title="Regular Season"
			      rate={this.rate(this.state.teamSelected.totalWins,this.state.teamSelected.totalLoses,this.state.teamSelected.totalTies)}
				    win={this.state.teamSelected.totalWins}
				    loss={this.state.teamSelected.totalLoses} 
				    tie={this.state.teamSelected.totalTies} 
				    boxa={{title:'Regular Season Champion',content:this.state.teamSelected.championshipWins}} 
				    boxb={{title:'Offense Fantasy Pts',content:'4'}}
				    boxc={{title:'Defense Fantasy Pts',content:'4'}} 
				    />
				  <Performance 
			      title="Playoff"
			      rate={this.rate(this.state.teamSelected.playOffWins,this.state.teamSelected.playOffLoses,this.state.teamSelected.playOffTies)}
				    win={this.state.teamSelected.playOffWins} 
				    loss={this.state.teamSelected.playOffLoses}
				    tie={this.state.teamSelected.playOffTies} 
				    boxa={{title:'Playoffs Appearances',content:this.state.teamSelected.playoffAppearances}} 
				    boxb={{title:'Championships Appearance',content:this.state.teamSelected.championshipAppearance}}
				    boxc={{title:'Championships',content:this.state.teamSelected.championshipWins}} 
				    />
				    <Chart data={chartData} />
		   </main>);
	}
}
export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
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
