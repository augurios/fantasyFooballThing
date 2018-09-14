import React from 'react';
import { Line } from 'react-chartjs-2';

import './_chart.scss';

const ChartWidget = (props)  =>
  (<div className="card mb-3">
        <div className="card-header">
          <i className="fas fa-chart-area" />
          Yearly Performance</div>
        <div className="card-body">
        <Line data={props.data} 
	    width={100}
	    height={30}
	    options={{
	        scales: {
	      xAxes: [{
	        time: {
	          unit: 'date'
	        },
	        gridLines: {
	          display: false
	        },
	        ticks: {
	         // maxTicksLimit: 9
	        }
	      }],
	      yAxes: [{
	        gridLines: {
	          color: "rgba(0, 0, 0, .125)",
	        },
			ticks: {
				min: 0, // minimum value
				max: 17, // maximum value
				stepSize:1 
			}
	      }],
	    },
	    legend: {
	      display: false
	    }
	    }}/>
        </div>
      </div>);
          
          
export default ChartWidget;