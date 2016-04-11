import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.API',
    icon: '&#xf187',
    outPorts: [],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'API'},
      '.inPorts circle': { type: 'input', magnet: 'passive' }
    }
  }, jointEntity.prototype.defaults)
});
