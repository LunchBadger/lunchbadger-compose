import joint from 'rappid';
import jointEntity from './Entity';
import _ from 'lodash';
import addPublicEndpoint from 'actions/PublicEndpoint/add';

export default jointEntity.extend({
  markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="icon fa"/><text class="label"/><g class="pipelines"/><g class="inPorts"/><g class="outPorts"/></g>',
  portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label port-icon"/></g>',
  pipelineMarkup: '<g class="pipeline pipeline<%= id %>"><rect class="pipeline-body"/><text class="pipeline-label">pipeline</text></g>',

  defaults: joint.util.deepSupplement({
    type: 'lunchBadger.Gateway',
    icon: '&#xf0c2',
    name: 'Gateway',
    outPorts: ['out', 'out2'],
    inPorts: ['in', 'in2'],
    pipelines: ['pipeline 1', 'pipeline 2'],
    proxiedByModel: [],
    proxiedByEndpoint: [],
    attrs: {
      '.label': {text: 'Gateway'},
      '.pipeline-label': {fill: '#000000'},
      '.inPorts circle': {group: 'private'},
      '.outPorts circle': {group: 'pipeline', magnet: 'active'}
    }
  }, jointEntity.prototype.defaults),

  initialize: function () {
    this.updatePipelineAttrs();
    this.processPipelines();
    this.on('change:attrs', this.processPorts, this);
    this.on('change:attrs', this.processPipelines, this);
    this.on('change:pipelines', this.updatePipelineAttrs, this);
    this.on('change:inPorts change:outPorts', this.updatePortsAttrs, this);

    // Call the `initialize()` of the parent.
    this.constructor.__super__.constructor.__super__.initialize.apply(this, arguments);
  },

  update: function () {
    this.updatePipelineAttrs();
    this.constructor.__super__.constructor.__super__.update.apply(this, arguments);
  },

  processPipelines: function () {
    var pipelines = {};

    _.each(this.get('attrs'), function (attrs) {
      if (attrs && attrs.pipeline) {
        pipelines[attrs.pipeline.id] = attrs.pipeline;
      }
    });

    this.pipelines = pipelines;
  },

  updatePipelineAttrs: function () {
    this.updatePortsAttrs();
    var currAttrs = this.get('attrs');
    _.each(this._pipelineSelectors, function (selector) {
      if (currAttrs[selector]) delete currAttrs[selector];
    });

    this._pipelineSelectors = [];

    var attrs = {};
    _.each(this.get('pipelines'), function (pipelineName, index, pipelines) {
      var pipelineAttributes = this.getPipelineAttrs(pipelineName, index, pipelines.length, '.pipelines');
      this._pipelineSelectors = this._pipelineSelectors.concat(_.keys(pipelineAttributes));
      _.extend(attrs, pipelineAttributes);
    }, this);

    if (this.get('pipelines')) {
      this.updateContainerAttrs(this.get('pipelines').length)
    }

    this.attr(attrs, {silent: true});

    this.processPipelines();
    // Let the outside world (mainly the `ModelView`) know that we're done configuring the `attrs` object.
    this.trigger('process:pipelines');
  },

  updateContainerAttrs: function (length) {
    var currentSize = this.get('size');

    this.set('size', {
      width: currentSize.width,
      height: 50 - 10 + length * 30
    });
  },

  getPipelineAttrs: function (pipelineName, index, total, selector, type) {
    var attrs = {};

    var pipelineClass = 'pipeline' + index;
    var pipelineSelector = selector + '>.' + pipelineClass;
    var pipelineLabelSelector = pipelineSelector + '>.pipeline-label';
    var pipelineBodySelector = pipelineSelector + '>.pipeline-body';
    attrs[pipelineLabelSelector] = {text: pipelineName};
    attrs[pipelineBodySelector] = {pipeline: {id: pipelineName || _.uniqueId(type)}};
    attrs[pipelineSelector] = {ref: '.body', 'ref-x': 30, 'ref-y': 45 + index * 30};
    return attrs;
  },

  getPortAttrs: function (portName, index, total, selector, type) {
    var attrs = {};

    var portClass = 'port' + index;
    var portSelector = selector + '>.' + portClass;
    var portLabelSelector = portSelector + '>.port-label';
    var portBodySelector = portSelector + '>.port-body';

    attrs[portLabelSelector] = {text: portName};
    attrs[portBodySelector] = {port: {id: portName || _.uniqueId(type), type: type}};
    attrs[portSelector] = {ref: '.body', 'ref-y': 55 + index * 30};

    if (selector === '.outPorts') {
      attrs[portSelector]['ref-dx'] = 0;
    }
    return attrs;
  },

  getTargetLinks: function (target) {
    const links = this.graph.getConnectedLinks(this);

    return _.filter(links, (link) => {
      return link.get('target').port === target.port;
    });
  },

  addInputProxy(inPort) {
    this.populateModelProxy(inPort);
    this.populateEndpointProxy(inPort);
  },

  populateModelProxy(inPort) {
    const proxyByInput = this.get('proxiedByModel');

    proxyByInput.push(inPort);
    this.set('proxiedByModel', proxyByInput);
  },

  populateEndpointProxy(inPort) {
    const proxyByInput = this.get('proxiedByEndpoint');

    proxyByInput.push(inPort);
    this.set('proxiedByEndpoint', proxyByInput);
  },

  addProxiedEndpoint(target, type, attrs) {
    if (type !== 'model' && type !== 'endpoint') {
      return;
    }

    const proxiedPorts = type === 'model' ? this.get('proxiedByModel') : this.get('proxiedByEndpoint');
    const targetLinks = this.getTargetLinks(target);

    if (targetLinks.length > 0) {
      const targetPortKey = _.findIndex(this.get('inPorts'), (port) => port === target.port);

      if (targetPortKey < 0 || proxiedPorts.indexOf(target.port) > -1) {
        return;
      }

      addPublicEndpoint(attrs);

      const recentlyAddedElement = this.graph.getLastCell();
      const link = new joint.shapes.lunchBadger.MainLink({
        source: {id: this.id, port: this.get('outPorts')[targetPortKey]},
        target: {id: recentlyAddedElement.id, port: recentlyAddedElement.get('inPorts')[0]}
      });

      this.graph.addCell(link);

      if (type === 'model') {
        this.populateModelProxy(target.port);
      } else {
        this.populateEndpointProxy(target.port);
      }
    }
  },

  addPublicEndpointByConnectingModel: function (target) {
    this.addProxiedEndpoint(target, 'model', {
      name: 'Public Model Endpoint'
    });
  },

  addPublicModelEndpointByConnectingPrivateEndpoint: function (target) {
    this.addProxiedEndpoint(target, 'endpoint', {
      name: 'Public Endpoint'
    });
  }

});
