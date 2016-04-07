import joint from 'rappid';

const jointEntityViewInterface = {
  initialize: function () {
    // Call the `initialize()` of the parent.
    console.log('initialize');
    this.constructor.__super__.constructor.__super__.initialize.apply(this, arguments);
  },
  render: function () {
    // Call the `initialize()` of the parent.
    console.log('render');
    this.constructor.__super__.constructor.__super__.render.apply(this, arguments);
  }
}

export default joint.shapes.devs.ModelView.extend(jointEntityViewInterface)
