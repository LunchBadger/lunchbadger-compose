import joint from 'rappid';
import $ from 'jquery';
import _ from 'lodash';

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
    this.renderLabel();
    this.renderPortsIcon();
  },
  renderLabel: function () {
    const attrs = this.model.get('attrs');
    const name = this.model.get('name');
    this.model.set(_.extend(attrs, {
      '.label': {text: name}
    }));
  },
  renderIcon: function () {
    var iconHandler = this.$el.find('.icon');
    iconHandler.html(this.model.attributes.icon);
  },
  renderPortsIcon() {
    _.each(this.$el.find('.port-icon'), function (port) {
      $(port).html('&#xf061');
    })
  },
  pointerdown: function () {
    joint.shapes.devs.ModelView.prototype.pointerdown.apply(this, arguments);
    this.model.toFront();
  }
}

export default joint.shapes.devs.ModelView.extend(jointEntityViewInterface)
