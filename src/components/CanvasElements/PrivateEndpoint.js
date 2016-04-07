import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import './CanvasElement.scss';
import updatePrivateEndpoint from '../../actions/PrivateEndpoint/update';
import joint from 'rappid';
import {groupName as privateGroupName} from '../Quadrant/PrivateQuadrant';

class PrivateEndpoint extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired
  };

  componentDidMount() {

    const {x, y} = this.props.position;
    const {width, height} = this.props.size;

    this.element = new joint.shapes.lunchBadger.PrivateEndpoint();

    this.props.graph.addCell(
      this.element.set('group', privateGroupName)
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

  onNameUpdate(name) {
    updatePrivateEndpoint(this.props.entity.id, {name});
  }

  render() {
    return null;
  }
}

export default CanvasElement(PrivateEndpoint);
