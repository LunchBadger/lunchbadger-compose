import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from  './EntityView';


export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Model',
    icon: '&#xf1b9',
    outPorts: ['out'],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'Model'}
    }
  }, jointEntity.prototype.defaults)
});
