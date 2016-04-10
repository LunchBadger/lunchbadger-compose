import joint from 'rappid';
import jointEntityView from './EntityView';

const jointGatewayViewInterface = {
  initialize: function () {
    // Call the `initialize()` of the parent.
    this.listenTo(this.model, 'change:pipelines', this.update);
    this.listenTo(this.model, 'process:pipelines', this.update);
    jointEntityView.prototype.initialize.apply(this, arguments);
  },
  render: function () {
    // Call the `initialize()` of the parent.
    jointEntityView.prototype.render.apply(this, arguments);
  },
  update: function () {
    // Call the `initialize()` of the parent.
    this.renderPipelines();
    jointEntityView.prototype.update.apply(this, arguments);
  },
  renderPipelines: function () {
    console.log('renderpipes');
    var $pipelines = this.$('.pipelines').empty();
    var pipelineTemplate = _.template(this.model.pipelineMarkup);

    _.each(this.model.attributes.pipelines,  function(pipeline, index) {
      $pipelines.append(joint.V(pipelineTemplate({ id: index, pipeline: pipeline })).node);
    });
  },

  pointerdown: function (evt, x, y) {
    this.constructor.__super__.pointerdown.call(this, evt, x, y);
    var pipes = this.model.get('pipelines');
    var inports = this.model.get('inPorts');
    var outports = this.model.get('outPorts');
    pipes.push('x' + inports.length);
    inports.push('y' + inports.length);
    outports.push('x' + inports.length);
    this.model.set('pipelines', pipes);
    this.model.set('inPorts', inports);
    this.model.set('outPorts', outports);
    //console.log(this.model);
    this.model.updatePipelineAttrs();

  }


}

export default jointEntityView.extend(jointGatewayViewInterface)
