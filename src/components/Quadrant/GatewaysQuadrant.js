import React, {Component, PropTypes} from 'react';
import Quadrant from './Quadrant';
import Gateway from '../CanvasElements/Gateway';
import QuadrantSizes from 'helpers/QuadrantSizes';

export const groupName = 'Gateways';

class GatewaysQuadrant extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    entities: PropTypes.array,
    quadrantSizes: PropTypes.instanceOf(QuadrantSizes).isRequired
  };

  static defaultProps = {
    entities: []
  };

  constructor(props) {
    super(props);
  }

  renderEntities() {
    const {quadrantSizes} = this.props;

    const fromLeft = quadrantSizes.getQuadrantLeftOffset(groupName) + 0.1 * quadrantSizes.getQuadrantWidth(groupName);
    const width = 0.8 * quadrantSizes.getQuadrantWidth(groupName);
    const nextAvailablePosition = 100;

    return this.props.entities.map((entity) => {
      return (
        <Gateway
          size={{width: width, height: 50}}
          position={{x: fromLeft, y: nextAvailablePosition}}
          graph={this.props.graph}
          key={entity.id}
          icon="fa-cloud"
          entity={entity}/>
      );
    })
  }

  render() {
    return (
      <div>
        {this.props.entities.length > 0 && this.renderEntities()}
      </div>
    );
  }
}

export default Quadrant(GatewaysQuadrant);
