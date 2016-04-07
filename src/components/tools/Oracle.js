import React, {Component} from 'react';
import './Tool.scss';
import AddDataSource from 'actions/DataSource/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class Oracle extends Component {
  render() {
    return (
      <div className="oracle tool__context__item" onClick={() => {setWorkingTool('Oracle'); AddDataSource()}}>
      	<i className="tool__icon fa fa-database"/>
      	<i className="tool__icon fa fa-oracle"/>
      	<span className="tool__name">Oracle</span>
      </div>
    );
  }
}
