import joint from 'rappid';
import $ from 'jquery';

const jointEntityViewInterface = {
  initialize: function () {
    // Call the `initialize()` of the parent.
    joint.shapes.devs.ModelView.prototype.initialize.apply(this, arguments);
  },
  render: function () {
    // Call the `initialize()` of the parent.
    joint.shapes.devs.ModelView.prototype.render.apply(this, arguments);
    this.renderIcon();
    this.renderPortsIcon();
  },
  update: function () {
    // Call the `initialize()` of the parent.
    joint.shapes.devs.ModelView.prototype.update.apply(this, arguments);
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
