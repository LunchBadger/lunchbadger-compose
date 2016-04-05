import joint from 'jointjs';

export default joint.dia.Element.extend({
  markup: '<rect class="card"/>',
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.PrivateEndpoint',
    size: { width: 200, height: 200 },
    attrs: {
      'rect': {width: 200, height: 30, fill: '#fff'}
    }
  }, joint.dia.Element.prototype.defaults)
});
