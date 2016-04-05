import joint from 'jointjs';

export default joint.dia.Element.extend({
  markup: [
    '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
    '<g class="labels"/>'
  ],
  defaults: {
    type: 'lunchBadger.Quadrant',
    attrs: {
      '.connection': {stroke: '#585858', 'stroke-width': 3},
      '.': {'pointer-events': 'none'}
    }
  }
});
