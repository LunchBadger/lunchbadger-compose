import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.PublicEndpoint',
    icon: '&#xf0ac',
    name: 'Public Endpoint',
    outPorts: [],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'Public Endpoint'},
      '.inPorts circle': {group: 'pipeline', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
