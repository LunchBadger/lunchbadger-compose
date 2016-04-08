import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Product',
    icon: '&#xf187',
    outPorts: [],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'Product'}
    }
  }, jointEntity.prototype.defaults)
});
