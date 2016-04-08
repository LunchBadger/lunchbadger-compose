import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import './CanvasElement.scss';
import updateGateway from '../../actions/Gateway/update';
import joint from 'rappid';
import {groupName as gatewaysGroupName} from '../Quadrant/GatewaysQuadrant';

class Gateway extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    paper: PropTypes.object
  };

  componentDidMount() {
    const {x, y} = this.props.position;
    const {width, height} = this.props.size;

    this.element = new joint.shapes.lunchBadger.Gateway();

    this.props.paper.graph.addCell(
      this.element.set('group', gatewaysGroupName)
        .position(x, y)
        .resize(width, height)
    );
  }

  onNameUpdate(name) {
    updateGateway(this.props.entity.id, {name});
  }

  render() {
    return null;
  }
}

export default CanvasElement(Gateway);
