import React, {Component} from 'react';
import './Tool.scss';
import AddModel from 'actions/AddModel';

export default class Model extends Component {
  render() {
    return (
      <div className="model tool" onClick={() => AddModel()}>
      	<i className="tool__icon fa fa-car"></i>
      	<span className="tool__tooltip">Model</span>
      </div>
    );
  }
}