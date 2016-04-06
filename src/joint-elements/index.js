import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from './EntityView';
import jointPrivateEndpoint from './PrivateEndpoint';

joint.shapes.lunchBadger = {
  Entity: jointEntity,
  EntityView: jointEntityView,
  PrivateEndpoint: jointPrivateEndpoint,
  PrivateEndpointView: jointEntityView
};

export default joint.shapes.lunchBadger;
