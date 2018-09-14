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
						   return <option key={team[index]} value={team}>{team}</option>
					    })}
					    
					    
	            </select>
	          </h2> 
	           <p>
	            <strong>Founded: </strong>{props.data.founded}<br />
	            <strong>Seasons: </strong> {props.data.seasons} <br />
	            <strong>Record: </strong> <span id="Record">108-52</span> <br />
	            <strong>Current Streak: </strong> <span id="current-streak">6 W</span> <br />
	            <strong>Biggest Winning Streak: </strong> <span id="big-win-streak">6</span> <br />
	            <strong>Biggest Losing Streak: </strong> <span id="big-loss-streak">4</span> <br />
	          </p>
	        </div> 
	        <div className="col-lg-4">
	          <p>
	            <strong>Total Points: </strong><span id="total-points">8000</span><br />
	            <strong>Total Points Against: </strong><span id="total-points-against">7000</span><br />
	            <strong>Net Points: </strong><span id="net-points">1000</span><br />
	            <strong>Average Points: </strong><span id="avg-points">2000</span><br />
	            <strong>Average Points Against: </strong><span id="avg-points-against">1800</span><br />
	            <strong>Average Net Points: </strong><span id="avg-net-points">200</span><br />
	            <strong>Highest Score: </strong><span id="highest-score">220</span><br />
	            <strong>Lowest Score: </strong><span id="loweset-score">50</span><br />
	            <strong>Biggest Win Margin: </strong><span id="big-win-margin">70</span><br />
	            <strong>Closest Game: </strong><span id="closet-game">1</span><br />
	          </p>
	        </div>
	        <div className="col-lg-4">
	          <div >
	            <h4>Head Coach</h4>
	            <img src={props.data.HCimage} alt="j4sPHne" id="head-coach-img" />
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