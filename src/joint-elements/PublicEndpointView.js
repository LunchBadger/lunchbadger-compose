import jointEntityView from './EntityView';
import _ from 'lodash';

const jointPublicEndpointViewInterface = {
  pointerup: function (evt, x, y) {
    const modelsBehind = _.filter(this.model.graph.findModelsFromPoint({x, y}), (model) => {
        return model.id !== this.model.id
      }
    );

    if (modelsBehind.length > 0 && modelsBehind[0].get('type') === 'lunchBadger.API') {
      modelsBehind[0].addEndpoint(this.model, this.model.graph.getConnectedLinks(this.model));
      this.model.remove();
    }

    jointEntityView.prototype.pointerup.apply(this, arguments);
  }
};

export default jointEntityView.extend(jointPublicEndpointViewInterface)
