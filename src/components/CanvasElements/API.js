import {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import joint from 'rappid';
import './CanvasElement.scss';
import {groupName as publicGroupName} from '../Quadrant/PublicQuadrant';

class API extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    paper: PropTypes.object
  };

  componentDidMount() {
    const {x, y} = this.props.position;
    const {width, height} = this.props.size;
    let elHeight;

    this.element = new joint.shapes.lunchBadger.API();
    elHeight = this.element.get('size').height;

    this.props.paper.graph.addCell(
      this.element.set('group', publicGroupName)
        .position(x, y)
        .resize(width, elHeight)
    );
  }

  render() {
    return null;
  }
}

export default CanvasElement(API);
