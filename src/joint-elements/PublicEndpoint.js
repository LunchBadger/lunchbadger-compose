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
      '.outPorts circle': {group: 'public', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
