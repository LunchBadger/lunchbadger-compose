import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Memory',
    icon: '&#xf1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Memory'},
      '.outPorts circle': {group: 'datasource', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
