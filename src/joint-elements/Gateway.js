import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Gateway',
    icon: '&#xf0c2',
    outPorts: ['out'],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'Gateway'}
    }
  }, jointEntity.prototype.defaults)
});
