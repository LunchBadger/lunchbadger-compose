import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import Port from './Port';
import './CanvasElement.scss';
import joint from 'rappid';
import updatePublicEndpoint from '../../actions/PublicEndpoint/update';
import {groupName as publicGroupName} from '../Quadrant/PublicQuadrant';

class PublicEndpoint extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired
  };

  componentDidMount() {

    const {x, y} = this.props.position;
    const {width, height} = this.props.size;

    this.element = new joint.shapes.lunchBadger.PublicEndpoint();

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

  onNameUpdate(name) {
    updatePublicEndpoint(this.props.entity.id, {name});
  }

  render() {
    return null;
  }
}

export default CanvasElement(PublicEndpoint);
