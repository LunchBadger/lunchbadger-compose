import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Oracle',
    icon: '&#xf1c0',
    name: 'Oracle',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Oracle'},
      '.outPorts circle': {group: 'datasource', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
