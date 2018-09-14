import React from 'react';
import Gauge from 'react-svg-gauge';

import './_performance.scss';

const TeamStats = (props)  =>
  (<div className="card mb-3">
        <div className="card-header">
          <i className="fas fa-table" />
          {props.title} Performance</div>
	        <div className="card-body">
	          <div className="row">
	            <div className="col-lg-5 win-rate">
	              <div className="row">
	                <div className="col-md-4 text-center">
	                 	<Gauge value={props.rate} width={150} height={125} label="Win Rate" />
	                </div>
	                <div className="col-md-8">
	                  <div className="row text-center">
	                    <div className="col-md-4">
	                      <div>Win</div>
	                      <p><strong>{props.win}</strong></p>
	                    </div>
	                    <div className="col-md-4">
	                      <div>Loss</div>
	                      <p><strong>{props.loss}</strong></p>
	                    </div>
	                    <div className="col-md-4">
	                      <div>Tie</div>
	                      <p><strong>{props.tie}</strong></p>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <div className="col-lg-7 text-center">
	              <div className="box-title-shadow">
	                <div className="row">
	                  <div className="col-md-4">
	                    <div className="stat">
	                      <h6>{props.boxa.title}</h6>
	                      <p id="OverregSeasonChamp">{props.boxa.content}</p>
	                    </div>
	                  </div>
	                  <div className="col-md-4">
	                    <div className="stat">
	                      <h6>{props.boxb.title}</h6>
	                      <p id="offePts">{props.boxb.content}</p>
	                    </div>
	                  </div>
	                  <div className="col-md-4">
	                    <div className="stat">
	                      <h6>{props.boxc.title}</h6>
	                      <p id="defPts">{props.boxc.content}</p>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>);
          
          
export default TeamStats;