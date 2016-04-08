import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Memory',
    icon: '&#f1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Memory'}
    }
  }, jointEntity.prototype.defaults)
});
