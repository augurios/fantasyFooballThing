import React from 'react';
import './_gamelogs.scss';

const Gamelogs = () =>
  ( <div className="card mb-3">
			          <div className="card-header">
			            <i className="fas fa-table" />
			            Gamelogs</div>
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
			                <tbody />
			              </table>
			            </div>
			          </div>
			          <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
			        </div>);

export default Gamelogs;
