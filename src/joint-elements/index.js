import joint from 'jointjs';
import jointQuadrant from './Quadrant';
import jointPrivateEndpoint from './PrivateEndpoint';

joint.shapes.lunchBadger = {
  Quadrant: jointQuadrant,
  PrivateEndpoint: jointPrivateEndpoint
};

export default joint.shapes.lunchBadger;
