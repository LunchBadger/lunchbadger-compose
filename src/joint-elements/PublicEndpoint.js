import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from  './EntityView';


export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.PublicEndpoint',
    icon: '&#f0ac',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Public Endpoint'}
    }
  }, jointEntity.prototype.defaults)
});
