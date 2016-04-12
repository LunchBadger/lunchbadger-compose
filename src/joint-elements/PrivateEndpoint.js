import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.PrivateEndpoint',
    icon: '&#xf14e',
    name: 'Private Endpoint',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Private Endpoint'},
      '.outPorts circle': {group: 'private', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
