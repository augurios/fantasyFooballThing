import React from 'react';

import './_team-stats.scss';

const TeamStats = (props)  =>
   (<div className="card mb-3 view-head">
        <div className="card-body">
          <div className="row">
	        <div className="col-lg-4">
	          <img src={props.data.logo} alt="j4sPHne" id="teamlogo" />
	          <h2> 
	            <select className="form-control" id="teamSelector" onChange={props.change}>
	            
	            		{props.teams.map((team, index) => {
						   return <option key={'key'+index} value={team}>{team}</option>
					    })}
					    
					    
	            </select>
	          </h2> 
	           <p>
	            <strong>Founded: </strong>{props.data.founded}<br />
	            <strong>Seasons: </strong> {props.data.seasons} <br />
	            <strong>Record: </strong> <span id="Record">?</span> <br />
	            <strong>Current Streak: </strong> {props.data.stats.currentStreak} <br />
	            <strong>Biggest Winning Streak: </strong> <span id="big-win-streak">{props.data.stats.highestStreak}</span> <br />
	            <strong>Biggest Losing Streak: </strong> <span id="big-loss-streak">{props.data.stats.lowestStreak}</span> <br />
	          </p>
	        </div> 
	        <div className="col-lg-4">
	          <p>
	            <strong>Total Points: </strong><span id="total-points">{props.data.stats.totalPoints}</span><br />
	            <strong>Total Points Against: </strong><span id="total-points-against">{props.data.stats.totalPointsAgainst}</span><br />
	            <strong>Net Points: </strong><span id="net-points">1000</span><br />
	            <strong>Average Points: </strong><span id="avg-points">{props.data.averageScore.toFixed(2)}</span><br />
	            <strong>Average Points Against: </strong><span id="avg-points-against">{props.data.averageScoreAgaints.toFixed(2)}</span><br />
	            <strong>Average Net Points: </strong><span id="avg-net-points">200</span><br />
	            <strong>Highest Score: </strong><span id="highest-score">{props.data.stats.highestScore}</span><br />
	            <strong>Lowest Score: </strong><span id="loweset-score">{props.data.stats.lowestScore}</span><br />
	            <strong>Biggest Win Margin: </strong><span id="big-win-margin">{props.data.stats.highestMargin}</span><br />
	            <strong>Closest Game: </strong><span id="closet-game">{props.data.stats.lowestMargin}</span><br />
	          </p>
	        </div>
	        <div className="col-lg-4">
	          <div >
	           
	            <p>
	              <strong id="name-head-coach">{props.data.headcoach} </strong><br />
	              <strong>Nickname: </strong> <span id="nickname">{props.data.nickname}</span> <br />
	              <strong>Experience: </strong> <span id="experience">{props.data.experience}</span> <br />
	              <strong>Earnings: </strong> <span id="earnings">{props.data.earnings}</span> <br />
	            </p>
	          </div>
	        </div>
	      </div>
        </div> 
      </div>);
          
          
export default TeamStats;