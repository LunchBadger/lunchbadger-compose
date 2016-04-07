import React, {Component} from 'react';
import './Tool.scss';
import AddModel from 'actions/Model/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class Model extends Component {
  render() {
    return (
      <div className="model tool" onClick={() => {setWorkingTool('Model'); AddModel()}}>
      	<i className="tool__icon fa fa-car"/>
      	<span className="tool__tooltip">Model</span>
      </div>
    );
  }
}
