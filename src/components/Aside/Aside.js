import React, {Component} from 'react';
import './Aside.scss';
import Endpoint from '../tools/Endpoint';
import Gateway from '../tools/Gateway';
import DataSource from '../tools/DataSource';
import Model from '../tools/Model';
import Product from '../tools/Product';
import Pan from '../tools/Pan';

export default class Aside extends Component {
  render() {
    return (
      <aside className="aside">
      	<Endpoint />
      	<hr />
      	<Gateway />
      	<hr />
      	<DataSource />
      	<Model />
      	<hr />
        <Product />
        <hr />
        <Pan />
      </aside>
    );
  }
}
