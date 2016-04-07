import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import PublicEndpoint from './PublicEndpoint';
import joint from 'rappid';
import './CanvasElement.scss';
import {groupName as publicGroupName} from '../Quadrant/PublicQuadrant';

class Product extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired
  };

  componentDidMount() {

    const {x, y} = this.props.position;
    const {width, height} = this.props.size;

    this.element = new joint.shapes.lunchBadger.Product();

    this.props.graph.addCell(
      this.element.set('group', publicGroupName)
        .position(x, y)
        .resize(width, height)
    );
  }

  componentDidUpdate() {
    const {x} = this.props.position;
    const {width, height} = this.props.size;
    const y = this.element.getBBox().y;

    this.element
      .position(x, y)
      .resize(width, height);
  }

  render() {
    return null;
  }
}

export default CanvasElement(Product);
