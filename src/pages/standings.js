/* global graphql */

import React from 'react';
import Breadcrumb from '../components/breadcrumb';



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
	  	
		 return (
		   <main className="container-fluid">
		    <Breadcrumb title="Standings"/>
			     <div className="card mb-3">
			        <div className="card-header">
			          <i className="fas fa-table" />
			          2016 Standings</div>
			        <div className="card-body">
			          <div className="table-responsive">
			            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
			              <thead>
			                <tr>
			                  <th>Rank</th>
			                  <th>Team</th>
			                  <th>W</th>
			                  <th>L</th>
			                  <th>T</th>
			                  <th>PCT</th>
			                  <th>PF</th>
			                  <th>PA</th>
			                </tr>
			              </thead>
			              <tbody>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>2</td>
			                  <td>Lord Yader</td>
			                  <td>11</td>
			                  <td>3</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			                <tr>
			                  <td>1</td>
			                  <td>Bullets</td>
			                  <td>12</td>
			                  <td>2</td>
			                  <td>0</td>
			                  <td>.857</td>
			                  <td>1,724.14</td>
			                  <td>1,357.38</td>
			                </tr>
			              </tbody>
			            </table>
			          </div>
			        </div>
			        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
			      </div>
		   </main>);
	}
}
export default IndexPage;

export const pageQuery = graphql`
  query StandingsQuery {
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
