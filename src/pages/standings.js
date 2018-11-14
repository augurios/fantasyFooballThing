/* global graphql */

import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import Standings from '../components/standings';
import StandingsSelect from '../components/standings-selector';


class IndexPage extends React.Component {
	constructor(props) {
						super(props);
						this.yearChangeHandler = this.yearChangeHandler.bind(this);
						this.loadYearData = this.loadYearData.bind(this);
	        	this.state = {
								yearLabels: [],
								YearSelected: "",
								gamesByYear: [],
								statsByTeam: []

		        }
	        }
					
		yearChangeHandler = (event) => {
			var selected = event.target.value;
			this.setState(
				{ YearSelected: selected },
				() => this.loadYearData()
			)
		}
	
		loadYearData = () => {
				var year = this.state.YearSelected;
				var yearObject = this.state.gamesByYear.find(obj => obj.year === year)
				var gameWeeks = yearObject.weeks;
				var allGamesYear = [];
				var gamesByPlayer = [];
				var statsByTeam = [];
			
				//get all games from weeks
				gameWeeks.map((week) => {
						week.games.map((game) => {
							allGamesYear.push(game);
						})
				})

				//get games by player
				allGamesYear.map((game) => {
					if(game.team_a["0"].team) {
						if(gamesByPlayer.find(obj => obj.team === game.team_a["0"].team)) {
								var	teamObject = gamesByPlayer.find(obj => obj.team === game.team_a["0"].team);
								teamObject.games.push(game);
						} else {
							gamesByPlayer.push({
								team: game.team_a["0"].team,
								games: [game]
							})
						}
						
					} else if (game.team_a["0"].name) {
						if(gamesByPlayer.find(obj => obj.team === game.team_a["0"].name)) {
								var	teamObject = gamesByPlayer.find(obj => obj.team === game.team_a["0"].name);
								teamObject.games.push(game);
						} else {
							gamesByPlayer.push({
								team: game.team_a["0"].name,
								games: [game]
							})
						}
						
					}
					
					if(game.team_b["0"].name) {
						if(gamesByPlayer.find(obj => obj.team === game.team_b["0"].name)) {
								var	teamObject = gamesByPlayer.find(obj => obj.team === game.team_b["0"].name);
								teamObject.games.push(game);
						} else {
							gamesByPlayer.push({
								team: game.team_b["0"].name,
								games: [game]
							})
						}
					} else if(game.team_b["0"].team){
						if(gamesByPlayer.find(obj => obj.team === game.team_b["0"].team)) {
								var	teamObject = gamesByPlayer.find(obj => obj.team === game.team_b["0"].team);
								teamObject.games.push(game);
						} else {
							gamesByPlayer.push({
								team: game.team_b["0"].team,
								games: [game]
							})
						}
					}
				})

				// process stats per team 

				gamesByPlayer.map((team) => {
					var wins = 0,
							loses = 0,
							ties = 0,
							points = 0,
							pointsAgaisnt = 0;
					
					team.games.map((game) => {
						if(game.team_a[0].team === team.team) {
							points += parseInt(game.team_a[0].score);
							pointsAgaisnt += parseInt(game.team_b[0].score);
						} else if (game.team_a[0].team === team.team) {
							points += parseInt(game.team_b[0].score);
							pointsAgaisnt += parseInt(game.team_a[0].score);
						}

						if (
							(parseInt(game.team_a[0].score) > parseInt(game.team_b[0].score)) && game.team_a[0].team === team.team ||
							(parseInt(game.team_b[0].score) > parseInt(game.team_a[0].score)) && game.team_b[0].team === team.team
						)  {
								wins++
						} else if (parseInt(game.team_b[0].score) === parseInt(game.team_a[0].score)) {
							ties++
						} else {
							loses++
						}
					})

					var winRate = wins/team.games.length;

					statsByTeam.push({
						team: team.team,
						wins: wins,
						loses: loses,
						ties: ties,
						points: points,
						pointsAgainst: pointsAgaisnt,
						winRate: winRate
					})
				})

				statsByTeam.sort(function(a, b) {
					a = new Date(a.wins);
					b = new Date(b.wins);
					return a>b ? -1 : a<b ? 1 : 0;
				});

				this.setState(
					{ statsByTeam: statsByTeam }
				)
				//console.log(statsByTeam);
		}
	
		componentWillMount() {
			const years = this.props.data.allDataJson.edges[0].node.years;
			var games = [];
			
			years.map((year) => {
				year.weeks_games.map((week) => {
					games.push(...week.games);
				})
			});

			var gamesByYear = [];
			var yearLabels = [];
			
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
					yearLabels.push(game.year);
				}
		})
			 this.setState({yearLabels:yearLabels });
			 this.setState({gamesByYear:gamesByYear})
			 this.setState({YearSelected: yearLabels[0] })
			 
  	}        
  	
  	componentDidMount() {
			this.loadYearData()
  	}
	        
  	render() {
	  	
		 return (
		   <main className="container-fluid">
		    <Breadcrumb title="Standings"/>
			     <div className="card mb-3">
			        <div className="card-header">
								<StandingsSelect data={this.state.yearLabels} change={(event) => this.yearChangeHandler(event)}/>
			          </div>
			        <div className="card-body">
			          <div className="table-responsive">
			            <Standings data={this.state.statsByTeam}/>
			          </div>
			        </div>
			        <div className="card-footer small text-muted"></div>
			      </div>
		   </main>);
	}
}
export default IndexPage;

export const pageQuery = graphql`
  query standingsQuery {
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
