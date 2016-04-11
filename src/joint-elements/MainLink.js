import joint from 'rappid';

export default joint.dia.Link.extend({
  markup: '<path class="connection"/><path class="marker-source"/><path class="marker-target"/><path class="connection-wrap"/><g class="link-tools" />',
  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.MainLink',
    metro: true,
    smooth: true,
    attrs: {
      '.connection': {stroke: '#ffffff', 'stroke-width': 4}
    }
  }, joint.dia.Link.prototype.defaults)
});
