import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.SQL',
    icon: '&#xf1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'SQL'},
      '.outPorts circle': {group: 'datasource', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
