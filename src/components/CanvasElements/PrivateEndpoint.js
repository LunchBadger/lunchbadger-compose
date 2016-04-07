import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import Port from './Port';
import './CanvasElement.scss';
import updatePrivateEndpoint from '../../actions/PrivateEndpoint/update';
import joint from 'rappid';
import PrivateQuadrant, {groupName as privateGroupName} from '../Quadrant/PrivateQuadrant';

class PrivateEndpoint extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired
  };

  componentDidMount() {
    console.log(joint.shapes.lunchBadger);
    var Entity = new joint.shapes.lunchBadger.PrivateEndpoint({
      position: {x: 20, y: 20},
      outPorts: ['out'],
      inPorts: ['in']
    });

    this.props.graph.addCell(Entity.set('group', privateGroupName).position(430, 100));
  }

  onNameUpdate(name) {
    updatePrivateEndpoint(this.props.entity.id, {name});
  }

  render() {
    return null;
  }
}

export default CanvasElement(PrivateEndpoint);
