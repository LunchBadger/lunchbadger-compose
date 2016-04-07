import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from  './EntityView';


export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.SQL',
    icon: '&#f1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'SQL'}
    }
  }, jointEntity.prototype.defaults)
});
