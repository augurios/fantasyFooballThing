/* global graphql */

import React from 'react';
import Features from '../components/features';
import HowTo from '../components/how-to';
import TeamStats from '../components/team-stats';
import Performance from '../components/Performance';
import Chart from '../components/chart';
import Breadcrumb from '../components/breadcrumb';


class IndexPage extends React.Component {
	constructor(props) {
	        	super(props);
	        	this.teamChangeHandler = this.teamChangeHandler.bind(this);
	        	this.rate = this.rate.bind(this);
	        	this.loadChart = this.loadChart.bind(this);
	        	this.state = {
		        	teamSelected: {},
		        	allTeams: [],
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
    
    rate = (win,loss,tie) => {
	     var totalOGames = parseInt(win) + parseInt(loss) + parseInt(tie);
		 var winPercent = 100 * parseInt(win);
		 return Math.round(winPercent / totalOGames) ;	
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
		const source = this.props.data.allDataJson.edges[0].node.teams;
		var team = this.state.teamSelected;
		var teams = [];
		for(var i = 0; i < source.length; i++) {
			teams.push(source[i].name);
		}
		team = source[0];
		
		
		this.setState({allTeams: teams})
		this.setState({teamSelected: team})
		
		
  	}        
  	
  	componentDidMount() {
	  	this.loadChart();
  	}
	        
  	render() {
	  	//console.log('props', this.props, this.state);
	  	const chartData = {
		  	 labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
		  	 datasets: [this.state.dataSet]
	  	}
		 return (
		   <main className="container-fluid">
		    	<Breadcrumb title="Franchise Stats"/>
			    <TeamStats data={this.state.teamSelected} teams={this.state.allTeams} change={(event) => this.teamChangeHandler(event)} />
			    <Performance 
			        title="Regular Season"
			        rate={this.rate(this.state.teamSelected.overall.win,this.state.teamSelected.overall.loss,this.state.teamSelected.overall.tie)}
				    win={this.state.teamSelected.overall.win} 
				    loss={this.state.teamSelected.overall.loss} 
				    tie={this.state.teamSelected.overall.tie} 
				    boxa={{title:'Regular Season Champion',content:this.state.teamSelected.overall.regSeasonChamp}} 
				    boxb={{title:'Offense Fantasy Pts',content:this.state.teamSelected.overall.offensePts}}
				    boxc={{title:'Defense Fantasy Pts',content:this.state.teamSelected.overall.defPts}} 
				    />
				  <Performance 
			        title="Playoff"
			        rate={this.rate(this.state.teamSelected.playoff.win,this.state.teamSelected.playoff.loss,this.state.teamSelected.playoff.tie)}
				    win={this.state.teamSelected.playoff.win} 
				    loss={this.state.teamSelected.playoff.loss} 
				    tie={this.state.teamSelected.playoff.tie} 
				    boxa={{title:'Playoffs Appearances',content:this.state.teamSelected.playoff.regSeasonChamp}} 
				    boxb={{title:'Championships Appearance',content:this.state.teamSelected.playoff.appearances}}
				    boxc={{title:'Championships',content:this.state.teamSelected.playoff.championships}} 
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
        teams {
          name
          founded
          logo
          headcoach
          nickname
          earnings
          experience
          seasons
          HCimage
          overall {
	            win
	            loss
	            tie
	            defPts
	            offensePts
	            regSeasonChamp
	          }
          playoff {
            win
            loss
            tie
            appearances
            championships
            regSeasonChamp
          }
          yearly {
            year
            wins
          }
        }
      } 
    }
  }
}
`;
