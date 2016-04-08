import React, {Component} from 'react';
import './Tool.scss';
import AddDataSource from 'actions/DataSource/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class SQL extends Component {
  render() {
    return (
      <div className="sql tool__context__item" onClick={() => {setWorkingTool('SQL'); AddDataSource('SQL')}}>
      	<i className="tool__icon fa fa-database"/>
      	<i className="tool__icon fa fa-sql"/>
      	<span className="tool__name">SQL</span>
      </div>
    );
  }
}
