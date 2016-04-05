import joint from 'jointjs';

export default joint.dia.Element.extend({
  markup: '<rect/>',
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Quadrant',
    size: {width: 300, height: 1000},
    attrs: {
      'rect': {width: 300, height: 1000}
    }
  }, joint.dia.Element.prototype.defaults)
});
