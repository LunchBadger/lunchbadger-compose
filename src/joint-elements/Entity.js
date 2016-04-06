import joint from 'rappid';
import jointEntityView from './EntityView';

export default joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

  markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><image class="icon"/><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
  portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

  defaults: joint.util.deepSupplement({

    type: 'devs.Entity',
    size: { width: 350, height: 50 },

    inPorts: [],
    outPorts: [],

    attrs: {
      '.': { magnet: false },
      '.body': {
        width: 300, height: 40,
        stroke: '#cccccc',
        fill: '#fffff'
      },
      '.port-body': {
        r: 10,
        magnet: true,
        stroke: '#000000'
      },
      text: {
        'pointer-events': 'none'
      },
      '.label': { text: 'Model', 'ref-x': .5, 'ref-y': 10, ref: '.body', 'text-anchor': 'middle', fill: '#000000' },
      '.inPorts .port-label': { x:-15, dy: 4, 'text-anchor': 'end', fill: '#000000' },
      '.outPorts .port-label':{ x: 15, dy: 4, fill: '#000000' }
    }

  }, joint.shapes.basic.Generic.prototype.defaults),

  getPortAttrs: function(portName, index, total, selector, type) {
    var attrs = {};

    var portClass = 'port' + index;
    var portSelector = selector + '>.' + portClass;
    var portLabelSelector = portSelector + '>.port-label';
    var portBodySelector = portSelector + '>.port-body';

    attrs[portLabelSelector] = { text: portName };
    attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
    attrs[portSelector] = { ref: '.body', 'ref-y': (index + 0.5) * (1 / total) };

    if (selector === '.outPorts') { attrs[portSelector]['ref-dx'] = 0; }

    return attrs;
  }
}));
