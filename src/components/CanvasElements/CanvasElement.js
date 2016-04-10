import React, {Component, PropTypes} from 'react';
import './CanvasElement.scss';

export default (ComposedComponent) => {
  return class CanvasElement extends Component {
    static propTypes = {
      icon: PropTypes.string.isRequired,
      entity: PropTypes.object.isRequired,
      paper: PropTypes.object
    };

    constructor(props) {
      super(props);

      this.state = {
        name: this.props.entity.name
      };
    }

    componentWillUpdate(nextProps) {
      if (this.instance) {
        const {element} = this.instance;
        const elementBoundingBox = element.getBBox();

        nextProps.paper.changeCanvasHeight(elementBoundingBox.y + elementBoundingBox.height);
      }
    }

    componentDidUpdate() {
      const {props, element} = this.instance;
      const elementBoundingBox = element.getBBox();
      const {x} = props.position;
      const {width, height} = props.size;

      element
        .position(x, elementBoundingBox.y)
        .resize(width, element.get('size').height);
    }

    validateName(text) {
      return (text.length > 0);
    }

    nameChanged(data) {
      if (typeof this.instance.onNameUpdate === 'function') {
        this.instance.onNameUpdate(data.name);
      }

      this.setState({...data});
    }

    render() {
      return (
        <ComposedComponent ref={(ref) => this.instance = ref} {...this.props} />
      );
    }
  }
}
