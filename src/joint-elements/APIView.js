import joint from 'rappid';
import jointEntityView from './EntityView';
import _ from 'lodash';

const jointAPIViewInterface = {
  initialize: function () {
    // Call the `initialize()` of the parent.
    this.listenTo(this.model, 'process:endpoints', this.update);
    jointEntityView.prototype.initialize.apply(this, arguments);
  },
  render: function () {
    // Call the `initialize()` of the parent.
    jointEntityView.prototype.render.apply(this, arguments);
  },
  update: function () {
    // Call the `initialize()` of the parent.
    this.renderEndpoints();
    jointEntityView.prototype.update.apply(this, arguments);
  },
  renderEndpoints: function () {
    var $endpoints = this.$('.endpoints').empty();
    var endpointTemplate = _.template(this.model.endpointMarkup);
    var el = this.$el;
    var endpointIcon = this.model.attributes.endpointIcon;

    _.each(this.model.attributes.endpoints,  function(endpoint, index) {
      $endpoints.append(joint.V(endpointTemplate({ id: index, endpoint: endpoint})).node);
      var iconHandler = el.find('.endpoint' + index + ' .endpoint-icon');
      iconHandler.html(endpointIcon);
    });
  },
};

export default jointEntityView.extend(jointAPIViewInterface)
