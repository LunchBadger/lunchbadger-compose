import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from  './EntityView';


export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Gateway',
    icon: '&#f0c2',
    outPorts: ['out'],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'Gateway'}
    }
  }, jointEntity.prototype.defaults)
});
