import React, {Component} from 'react';
import './Tool.scss';
import AddAPI from 'actions/API/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class API extends Component {
  render() {
    return (
      <div className="api tool" onClick={() => {setWorkingTool('API'); AddAPI()}}>
        <i className="tool__icon fa fa-archive"/>
        <span className="tool__tooltip">API</span>
      </div>
  );
  }
}
