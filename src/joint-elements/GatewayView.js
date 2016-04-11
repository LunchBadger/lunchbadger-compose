import joint from 'rappid';
import jointEntityView from './EntityView';
import _ from 'lodash';

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
    var $pipelines = this.$('.pipelines').empty();
    var pipelineTemplate = _.template(this.model.pipelineMarkup);

    _.each(this.model.attributes.pipelines,  function(pipeline, index) {
      $pipelines.append(joint.V(pipelineTemplate({ id: index, pipeline: pipeline })).node);
    });
  }
};

export default jointEntityView.extend(jointGatewayViewInterface)
