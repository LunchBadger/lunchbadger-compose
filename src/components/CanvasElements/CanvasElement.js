import React, {Component, PropTypes} from 'react';
import './CanvasElement.scss';
import InlineEdit from 'react-edit-inline';

export default (ComposedComponent) => {
  return class CanvasElement extends Component {
    static propTypes = {
      icon: PropTypes.string.isRequired,
      entity: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);

      this.state = {
        name: this.props.entity.name
      };
    }

    validateName(text) {
      return (text.length > 0);
    }

    nameChanged(data) {
      if (typeof this.element.onNameUpdate === 'function') {
        this.element.onNameUpdate(data.name);
      }

      this.setState({...data});
    }

    render() {
      return (
            <ComposedComponent ref={(ref) => this.element = ref} {...this.props} />
      );
    }
  }
}
