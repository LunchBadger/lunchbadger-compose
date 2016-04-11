import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.API',
    icon: '&#xf187',
    outPorts: [],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'API'}
    }
  }, jointEntity.prototype.defaults)
});
