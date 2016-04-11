import joint from 'rappid';
import jointEntity from './Entity';

export default jointEntity.extend({
  markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="icon fa"/><text class="label"/><g class="endpoints"/><g class="inPorts"/><g class="outPorts"/></g>',
  endpointMarkup: '<g class="endpoint endpoint<%= id %>"><text class="endpoint-icon fa"/><text class="endpoint-label">endpoint</text></g>',

  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.API',
    icon: '&#xf187',
    endpointIcon: '&#xf0ac',
    outPorts: [],
    inPorts: ['in'],
    endpoints: ['endpoint'],
    attrs: {
      '.label': {text: 'API'},
      '.endpoint-icon': {x: -30, y: 14, 'font-size': 30, width: 40, height: 40, fill: '#000000'},
      '.endpoint-label': {fill: '#000000'},
      '.inPorts circle': {group: 'pipeline'}
    }

  }, jointEntity.prototype.defaults),

  initialize: function () {
    this.constructor.__super__.constructor.__super__.initialize.apply(this, arguments);
    this.updateEndpointAttrs();
    this.processEndpoints();
    this.on('change:attrs', this.processPorts, this);
    this.on('change:attrs', this.processEndpoints, this);
    this.on('change:endpoints', this.updateEndpointAttrs, this);
    this.on('change:inPorts change:outPorts', this.updatePortsAttrs, this);

    // Call the `initialize()` of the parent.

  },

  update: function () {
    this.updateEndpointAttrs();
    this.constructor.__super__.constructor.__super__.update.apply(this, arguments);
  },

  processEndpoints: function () {
    var endpoints = {};

    _.each(this.get('attrs'), function(attrs) {
      if (attrs && attrs.endpoint) {
        endpoints[attrs.endpoint.id] = attrs.endpoint;
      }
    });

    this.endpoints = endpoints;
  },

  updateEndpointAttrs: function () {
    this.updatePortsAttrs();
    var currAttrs = this.get('attrs');
    _.each(this._endpointSelectors, function(selector) {
      if (currAttrs[selector]) delete currAttrs[selector];
    });

    this._endpointSelectors = [];

    var attrs = {};
    _.each(this.get('endpoints'), function(endpointName, index, endpoints) {
      var endpointAttributes = this.getEndpointAttrs(endpointName, index, endpoints.length, '.endpoints');
      this._endpointSelectors = this._endpointSelectors.concat(_.keys(endpointAttributes));
      _.extend(attrs, endpointAttributes);
    }, this);

    if (this.get('endpoints')) {
      this.updateContainerAttrs(this.get('endpoints').length)
    }

    this.attr(attrs, { silent: true });

    this.processEndpoints();
    // Let the outside world (mainly the `ModelView`) know that we're done configuring the `attrs` object.
    this.trigger('process:endpoints');
  },

  updateContainerAttrs: function (length) {
    var currentSize = this.get('size');

    this.set('size', {
      width: currentSize.width,
      height: 50 - 10 + length * 30
    });
  },

  getEndpointAttrs: function (endpointName, index, total, selector, type) {
    var attrs = {};

    var endpointClass = 'endpoint' + index;
    var endpointSelector = selector + '>.' + endpointClass;
    var endpointLabelSelector = endpointSelector + '>.endpoint-label';
    var endpointBodySelector = endpointSelector + '>.endpoint-body';
    attrs[endpointLabelSelector] = { text: endpointName };
    attrs[endpointBodySelector] = { endpoint: { id: endpointName || _.uniqueId(type)} };
    attrs[endpointSelector] = { ref: '.body', 'ref-x': 60, 'ref-y': 45 + index * 30 };
    return attrs;
  },

  getPortAttrs: function(portName, index, total, selector, type) {
    var attrs = {};

    var portClass = 'port' + index;
    var portSelector = selector + '>.' + portClass;
    var portLabelSelector = portSelector + '>.port-label';
    var portBodySelector = portSelector + '>.port-body';

    attrs[portLabelSelector] = { text: portName };
    attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
    attrs[portSelector] = { ref: '.body', 'ref-y': 55 + index * 30 };

    if (selector === '.outPorts') { attrs[portSelector]['ref-dx'] = 0; }
    return attrs;
  },

  addEndpoint: function (endpoint) {
    var endpoints = this.get('endpoints');
    endpoints.push(endpoint.get('name'));
    var inports = this.get('inPorts');
    inports.push(endpoint.id + '_' + endpoint.get('inPorts')[0]);
    this.set({endpoints: endpoints});
    this.set({'inPorts': inports});
    this.trigger('change:endpoints');

  }

});
