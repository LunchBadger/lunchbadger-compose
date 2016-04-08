import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.PrivateEndpoint',
    icon: '&#xf14e',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Private Endpoint'}
    }
  }, jointEntity.prototype.defaults)
});
