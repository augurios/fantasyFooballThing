import React from 'react';
import './_headtohead.scss';

const Headtohead = (props) =>
  ( <div className="row">
      <div className="col-6">
        <div className="team team-a">
          <div className="totals">
            <select className="form-control team-selector">
              <option value> </option>
              {props.data.map((owner, index) => {
						   return <option key={owner.name} value={owner.name}>{owner.fantasyname} ({owner.name})</option>
					    })}
              
            </select>
            <h2 className="record"><strong>Record:</strong><span className="wins-record">0</span>-<span className="loss-record">0</span></h2>
          </div>
          <div className="stats">
            <div className="image"><img src="#" alt="image"  /></div>
            <div className="nums">
              <p>Streak: <span className="streak-h2h" /></p>
              <p>Total Points: <span className="total-points-h2h" /></p>
              <p>Net Points: <span className="net-points-h2h" /></p>
              <p>Highest Score: <span className="highest-score-h2h" /></p>
              <p>Lowest Score: <span className="loweset-score-h2h" /></p>
              <p>Biggest Win Margin: <span className="big-win-margin-h2h" /></p>
              <p>Smallest Win Margin: <span className="small-win-margin-h2h" /></p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="team team-b">
          <div className="totals">
            <select className="form-control team-selector">
              <option value> </option>
              {props.data.map((owner, index) => {
						   return <option key={owner.name} value={owner.name}>{owner.fantasyname} ({owner.name})</option>
					    })}
            </select>
            <h2 className="record"><strong>Record:</strong><span className="wins-record">0</span>-<span className="loss-record">0</span></h2>
          </div>
          <div className="stats">
            <div className="image"><img src="#" alt="image" /></div>
            <div className="nums">
              <p>Streak: <span className="streak-h2h" /></p>
              <p>Total Points: <span className="total-points-h2h" /></p>
              <p>Net Points: <span className="net-points-h2h" /></p>
              <p>Highest Score: <span className="highest-score-h2h" /></p>
              <p>Lowest Score: <span className="loweset-score-h2h" /></p>
              <p>Biggest Win Margin: <span className="big-win-margin-h2h" /></p>
              <p>Smallest Win Margin: <span className="small-win-margin-h2h" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>);

export default Headtohead;
