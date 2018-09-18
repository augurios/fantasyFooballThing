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
              <p>current streak: {props.teama.currentstreak}</p>
			  <p>highest win streak: {props.teama.highestwinstreak}</p>
			  <p>highest lose streak: {props.teama.highestlosestreak}</p>
              <p>Total Points: {props.teama.totalPoints}</p>
              <p>Net Points: {props.teama.totalPoints - props.teamb.totalPoints }</p>
              <p>Highest Score: {props.teama.highestScore}</p>
              <p>Lowest Score: {props.teama.lowestScore}</p>
              <p>Biggest Win Margin:{props.teama.highestMargin}</p>
              <p>Smallest Win Margin: {props.teama.lowestMargin}</p>
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
              <p>current streak: {props.teamb.currentstreak}</p>
			  <p>highest win streak: {props.teamb.highestwinstreak}</p>
			  <p>highest lose streak: {props.teamb.highestlosestreak}</p>
              <p>Total Points: {props.teamb.totalPoints}</p>
              <p>Net Points: {props.teamb.totalPoints - props.teama.totalPoints }</p>
              <p>Highest Score: {props.teamb.highestScore}</p>
              <p>Lowest Score: {props.teamb.lowestScore}</p>
              <p>Biggest Win Margin:{props.teamb.highestMargin}</p>
              <p>Smallest Win Margin: {props.teamb.lowestMargin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>);

export default Headtohead;
