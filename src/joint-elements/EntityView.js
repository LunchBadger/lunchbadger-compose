import joint from 'rappid';
import $ from 'jquery';

const jointEntityViewInterface = {
  initialize: function () {
    // Call the `initialize()` of the parent.
    this.constructor.__super__.constructor.__super__.initialize.apply(this, arguments);
  },
  render: function () {
    // Call the `initialize()` of the parent.
    this.constructor.__super__.constructor.__super__.render.apply(this, arguments);
    this.renderIcon();
    this.renderPortsIcon();
  },
  renderIcon: function () {
    var iconHandler = this.$el.find('.icon');
    iconHandler.html(this.model.attributes.icon);
  },
  renderPortsIcon() {
    _.each(this.$el.find('.port-icon'), function (port) {
      $(port).html('&#xf061');
    })
  }
}

export default joint.shapes.devs.ModelView.extend(jointEntityViewInterface)
