import React from 'react';
import './_headtohead.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown)

class Headtohead extends React.Component {
  

  render() {
    var bgStyleA = {
      backgroundImage:`url(${this.props.teama.logo})`
    };
    var bgStyleB = {
      backgroundImage:`url(${this.props.teamb.logo})`
    };
    return ( 
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
            <div className="row">
              <div className="col-6">
                <div className="team team-a">
                  <div className="totals">
                  <div className="image" style={ bgStyleA }></div>
                    <select className="form-control team-selector teama" name="teama" onChange={this.props.triggerhappy}>
                      <option value> Red Team</option>
                      {this.props.owners.map((owner, index) => {
                      return <option key={owner.name} value={owner.name}>{owner.fantasyname} ({owner.name})</option>
                      })}
                      
                    </select><FontAwesomeIcon icon="caret-down"/>
                    <h2 className={"record " + (this.props.games ? 'visible' : 'hidden')}>{this.props.teama.record}</h2>
                  </div>
                
                </div>
              </div>
              <div className="col-6">
                <div className="team team-b">
                  <div className="totals">
                  <div className="image" style={ bgStyleB }></div>
                    <select className="form-control team-selector teamb" name="teamb" onChange={this.props.triggerhappy} >
                      <option value>Blue Team</option>
                      {this.props.owners.map((owner, index) => {
                      return <option key={owner.name} value={owner.name}>{owner.fantasyname} ({owner.name})</option>
                      })}
                    </select><FontAwesomeIcon icon="caret-down"/>
                    <h2 className={"record " + (this.props.games ? 'visible' : 'hidden')}>{this.props.teamb.record}</h2>
                </div>
                
                </div>
              </div>
            </div>
                        
            <div className="container-fluid mb-4">
              <div className="row">
              <div className="col">
                <div className={"row team-stats " + (this.props.games ? 'visible' : 'hidden')}>
                  <div className="col-6"><div>
                  
                  
                  <div className="nums">
                    <p><strong>current streak:</strong> {this.props.teama.currentstreak}</p>
                    <p><strong>highest win streak:</strong> {this.props.teama.highestwinstreak}</p>
                    <p><strong>highest lose streak:</strong> {this.props.teama.highestlosestreak}</p>
                    <p><strong>Total Points:</strong> {this.props.teama.totalPoints}</p>
                    <p><strong>Net Points:</strong> {this.props.teama.totalPoints - this.props.teamb.totalPoints }</p>
                    <p><strong>Highest Score:</strong> {this.props.teama.highestScore}</p>
                    <p><strong>Lowest Score:</strong> {this.props.teama.lowestScore}</p>
                    <p><strong>Biggest Win Margin:</strong>{this.props.teama.highestMargin}</p>
                    <p><strong>Smallest Win Margin:</strong> {this.props.teama.lowestMargin}</p>
                  </div>
                </div>
                </div>
                  <div className="col-6">
                  <div>
                  <div className="nums tmb">
                    <p> {this.props.teamb.currentstreak}</p>
              <p>{this.props.teamb.highestwinstreak}</p>
              <p> {this.props.teamb.highestlosestreak}</p>
                    <p> {this.props.teamb.totalPoints}</p>
                    <p> {this.props.teamb.totalPoints - this.props.teama.totalPoints }</p>
                    <p> {this.props.teamb.highestScore}</p>
                    <p> {this.props.teamb.lowestScore}</p>
                    <p>{this.props.teamb.highestMargin}</p>
                    <p> {this.props.teamb.lowestMargin}</p>
                  </div>
                </div>
                  
                  </div>
                </div>
              </div>
            </div>
            </div>  
          </div>
        </div>)
  }
};

export default Headtohead;
