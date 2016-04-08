import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.PublicEndpoint',
    icon: '&#xf0ac',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Public Endpoint'}
    }
  }, jointEntity.prototype.defaults)
});
