import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import './CanvasElement.scss';
import updateBackend from '../../actions/DataSource/update';
import joint from 'rappid';
import {groupName as backendGroupName} from '../Quadrant/BackendQuadrant';

class DataSource extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    paper: PropTypes.object,
    type: PropTypes.string
  };

  componentDidMount() {
    const {x, y} = this.props.position;
    const {width, height} = this.props.size;
  console.log(this.props.type);
    this.element = new joint.shapes.lunchBadger[this.props.type]();

    this.props.paper.graph.addCell(
      this.element.set('group', backendGroupName)
        .position(x, y)
        .resize(width, height)
    );
  }

  onNameUpdate(name) {
    updateBackend(this.props.entity.id, {name});
  }

  render() {
    return null;
  }
}

export default CanvasElement(DataSource);
