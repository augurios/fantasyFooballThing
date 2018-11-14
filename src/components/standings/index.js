import React from 'react';
import './_standings.scss';


class Standings extends React.Component {
  

  render() {
    
    return ( 
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
      {this.props.data.map((team, index) => {
           return <tr key={'key'+index} >
                    <td>{index + 1}</td>
                    <td>{team.team}</td>
                    <td>{team.wins}</td>
                    <td>{team.loses}</td>
                    <td>{team.ties}</td>
                    <td>{team.winRate.toFixed(3)}</td>
                    <td>{team.points}</td>
                    <td>{team.pointsAgainst}</td>
                </tr>
					})}
       
      </tbody>
    </table>)
  }
};

export default Standings;
