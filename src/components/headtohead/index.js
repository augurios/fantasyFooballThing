import React from 'react';
import './_headtohead.scss';

const Headtohead = (props) =>
  ( <div className="row">
      <div className="col-6">
        <div className="team team-a">
          <div className="totals">
            <select className="form-control team-selector teama" name="teama" onChange={props.triggerhappy}>
              <option value> </option>
              {props.owners.map((owner, index) => {
						   return <option key={owner.name} value={owner.name}>{owner.fantasyname} ({owner.name})</option>
					    })}
              
            </select>
            <h2 className="record"><strong>Record:</strong>{props.teama.record}</h2>
          </div>
          <div className="stats">
            <div className="image"><img src={props.teama.logo}  alt="image"  /></div>
            <div className="nums">
              <p>currentstreak: {props.teama.currentstreak}</p>
			  <p>highestwinstreak: {props.teama.highestwinstreak}</p>
			  <p>highestlosestreak: {props.teama.highestlosestreak}</p>
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
            <select className="form-control team-selector teamb" name="teamb" onChange={props.triggerhappy} >
              <option value> </option>
              {props.owners.map((owner, index) => {
						   return <option key={owner.name} value={owner.name}>{owner.fantasyname} ({owner.name})</option>
					    })}
            </select>
            <h2 className="record"><strong>Record:</strong>{props.teamb.record}</h2>
          </div>
          <div className="stats">
            <div className="image"><img src={props.teamb.logo} alt="image" /></div>
            <div className="nums">
              <p>currentstreak: {props.teamb.currentstreak}</p>
			  <p>highestwinstreak: {props.teamb.highestwinstreak}</p>
			  <p>highestlosestreak: {props.teamb.highestlosestreak}</p>
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
