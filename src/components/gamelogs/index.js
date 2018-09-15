import React from 'react';
import './_gamelogs.scss';

const Gamelogs = (props) =>
  ( <div className="card mb-3">
			          <div className="card-header">
			            <i className="fas fa-table" />
			            Gamelogs</div>
			          <div className="card-body">
			            <div className="table-responsive">
			              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
			                <thead>
			                  <tr>
			                  <th>Date</th>
			                    <th>Game</th>
			                  </tr>
			                </thead>
			                <tbody>
			                {props.data && (
			                	props.data.map((game, index) => {
				                	return <tr key={game.team_b[0].score + game.team_a[0].score} >
				                				<td>{game.year}, {game.week}</td>
				                				<td>{game.team_a[0].team} <strong>{game.team_a[0].score}</strong>, {game.team_b[0].name} <strong>{game.team_b[0].score}</strong></td>
				                		   </tr>
			                	})
			                	
			                	)}
			                </tbody>
			              </table>
			            </div>
			          </div>
			          <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
			        </div>);

export default Gamelogs;
