import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Model',
    icon: '&#xf1b9',
    name: 'Model',
    outPorts: ['out'],
    inPorts: ['in'],
    attrs: {
      '.label': {text: 'Model'},
      '.inPorts circle': {group: 'datasource'},
      '.outPorts circle': {group: 'private', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults)
});
