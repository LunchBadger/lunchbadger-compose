import React, {Component} from 'react';
import './Tool.scss';
import AddDataSource from 'actions/DataSource/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class Salesforce extends Component {
  render() {
    return (
      <div className="salesforce tool__context__item" onClick={() => {setWorkingTool('Salesforce'); AddDataSource()}}>
      	<i className="tool__icon fa fa-database"/>
      	<i className="tool__icon over fa fa-cloud"/>
      	<span className="tool__name">Salesforce</span>
      </div>
    );
  }
}
