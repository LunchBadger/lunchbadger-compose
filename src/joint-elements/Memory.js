import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from  './EntityView';


export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Memory',
    icon: '&#xf1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Memory'}
    }
  }, jointEntity.prototype.defaults)
});
