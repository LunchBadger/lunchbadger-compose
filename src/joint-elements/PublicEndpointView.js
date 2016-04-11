import joint from 'rappid';
import jointEntityView from './EntityView';
import _ from 'lodash';

const jointPublicEndpointViewInterface = {
  pointerup: function (evt, x, y) {
    var modelsBehind = _.filter(this.model.graph.findModelsFromPoint({x, y}), (model) => {
      return model.id !== this.model.id }
    );
    if (modelsBehind[0].get('type') === 'lunchBadger.API') {
      modelsBehind[0].addEndpoint(this.model, this.model.graph.getConnectedLinks(this.model));
      this.model.remove();
    }
  }
};

export default jointEntityView.extend(jointPublicEndpointViewInterface)
