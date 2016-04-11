import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Salesforce',
    icon: '&#xf1c0',
    outPorts: ['out'],
    inPorts: [],
    attrs: {
      '.label': {text: 'Salesforce'}
    }
  }, jointEntity.prototype.defaults)
});
