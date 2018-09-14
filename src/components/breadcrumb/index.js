import React from 'react';
import './_breadcrumb.scss';

const Breadcrumb = (props) =>
  (<ol className="breadcrumb">
		<li className="breadcrumb-item">
		     <a href="/">Dashboard</a>
		 </li>
		<li className="breadcrumb-item active">{props.title}</li>
	</ol>);

export default Breadcrumb;
