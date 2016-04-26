import React, {Component, PropTypes} from 'react';
import BaseDetails from 'components/Panel/EntitiesDetails/BaseDetails'
import updateGateway from 'actions/CanvasElements/Gateway/update';

class GatewayDetails extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  update() {
    updateGateway(this.props.entity.id, {
      name: this.props.name
    });
  }


  render() {
    return (
      <h2>{this.props.name}</h2>
    )
  }
}

export default BaseDetails(GatewayDetails);
