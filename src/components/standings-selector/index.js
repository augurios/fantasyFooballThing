import React from 'react';

import './_standings-selector.scss';

const StandingsSelect = (props)  =>
   (
       <select className="form-control" id="yearSelector" onChange={props.change}>
							{props.data.map((year, index) => {
					 return <option key={'key'+index} value={year}>{year}</option>
					})}
			 </select>
      );
          
          
export default StandingsSelect;