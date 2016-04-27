import React, {Component, PropTypes} from 'react';
import BaseDetails from './BaseDetails.js'
import updatePublicEndpoint from 'actions/CanvasElements/PublicEndpoint/update';
import Input from 'components/Generics/Form/Input';

class PublicEndpointDetails extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  update(model) {
    updatePublicEndpoint(this.props.entity.id, model);
  }

  render() {
    const {entity} = this.props;

    return (
      <div className="details-panel__container details-panel__columns">
        <div className="details-panel__fieldset">
          <span className="details-panel__label">URL</span>
          <Input className="details-panel__input"
                 value={entity.url}
                 name="url"/>
        </div>
      </div>
    )
  }
}

export default BaseDetails(PublicEndpointDetails);

