import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import Port from './Port';
import './CanvasElement.scss';
import updatePrivateEndpoint from '../../actions/PrivateEndpoint/update';
import joint from 'jointjs';
class PrivateEndpoint extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired
  };

  componentDidMount() {
    var Entity = new joint.shapes.lunchBadger.PrivateEndpoint({position: { x: 20, y: 20 }});
    var quadrant = this.props.graph.getCells()[0];
    console.log(this.props.graph.getCells());


    quadrant.embed(Entity);
    this.props.graph.addCell(Entity);
    //this.props.graph.resetCells();
  }

  onNameUpdate(name) {
    updatePrivateEndpoint(this.props.entity.id, {name});
  }

  render() {
    return null;
  }
}

export default CanvasElement(PrivateEndpoint);
