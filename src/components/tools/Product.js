import React, {Component} from 'react';
import './Tool.scss';
import AddProduct from 'actions/Product/add';
import setWorkingTool from 'actions/AppState/setWorkingTool';

export default class Product extends Component {
  render() {
    return (
      <div className="product tool" onClick={() => {setWorkingTool('Product'); AddProduct()}}>
        <i className="tool__icon fa fa-archive"/>
        <span className="tool__tooltip">Product</span>
      </div>
  );
  }
}
