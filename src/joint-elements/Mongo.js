import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Mongo',
    icon: '&#f1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Mongo'}
    }
  }, jointEntity.prototype.defaults)
});
