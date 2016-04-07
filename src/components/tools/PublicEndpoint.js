import React, {Component} from 'react';
import './Tool.scss';
import AddPublicEndpoint from 'actions/PublicEndpoint/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class PublicEndpoint extends Component {
  render() {
    return (
      <div className="publicendpoint tool__context__item" onClick={() => {setWorkingTool('PublicEndpoint'); AddPublicEndpoint()}}>
      	<i className="tool__icon fa fa-globe"/>
      	<span className="tool__name">Public Endpoint</span>
      </div>
    );
  }
}
