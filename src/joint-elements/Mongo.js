import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Mongo',
    icon: '&#xf1c0',
    name: 'Mongo',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Mongo'},
      '.outPorts circle': {group: 'datasource', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
