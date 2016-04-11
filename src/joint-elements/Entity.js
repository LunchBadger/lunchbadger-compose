import joint from 'rappid';
import _ from 'lodash';

export default joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

  markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="icon fa"/><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
  portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label port-icon"/></g>',

  defaults: joint.util.deepSupplement({

    type: 'devs.Entity',
    size: { width: 350, height: 50 },

    inPorts: [],
    outPorts: [],

    icon: '&#xf040',

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
      '.icon': {x: 30, y: 35, 'font-size': 30, width: 40, height: 40, fill: '#000000'},
      '.label': { text: 'Model', 'ref-x': 80, 'ref-y': 18, ref: '.body', 'text-anchor': 'left', fill: '#000000' },
      '.inPorts circle': {type: 'input'},
      '.inPorts .port-label': {x: 0, dy: -7.5, 'text-anchor': 'middle', fill: '#000000'},
      '.outPorts .port-label':{x: -6, dy: -7.5, fill: '#000000'}
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
