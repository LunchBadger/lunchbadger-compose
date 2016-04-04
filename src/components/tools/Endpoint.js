import React, {Component} from 'react';
import './Tool.scss';
import PrivateEndpoint from './PrivateEndpoint';
import PublicEndpoint from './PublicEndpoint';

export default class Endpoint extends Component {
  render() {
    return (
      <div className="endpoint tool context">
      	<i className="tool__extend fa fa-caret-down"/>
      	<i className="tool__icon fa fa-github"/>
      	<ul className="tool__context">
      		<li>
      			<PrivateEndpoint />
      		</li>
      		<li>
      			<PublicEndpoint />
      		</li>
      	</ul>
      </div>
    );
  }
}
