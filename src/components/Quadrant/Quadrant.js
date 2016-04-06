import React, {Component, PropTypes} from 'react';
import QuadrantResizeHandle from './QuadrantResizeHandle';
import './Quadrant.scss';
import _ from 'lodash';

export default (ComposedComponent) => {
  return class Quadrant extends Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
      resizable: PropTypes.bool,
      data: PropTypes.object.isRequired,
      graph: PropTypes.object.isRequired,
      onResizeEnd: PropTypes.func
    };

    constructor(props) {
      super(props);

      this.state = {
        quadrantWidth: '25%',
        entities: []
      };

      this.onStoreChange = () => {
        this.setState({
          entities: this.props.data.getData()
        });
      }
    }

    componentDidMount() {
      this.quadrant = this.refs.quadrant;
      this.quadrantBounds = this.quadrant.getBoundingClientRect();

      if (this.props.data) {
        this.props.data.addChangeListener(this.onStoreChange);
      }
    }

    componentWillUnmount() {
      if (this.props.data) {
        this.props.data.removeChangeListener(this.onStoreChange);
      }
    }

    recalculateQuadrantWidth(event) {
      this.quadrantBounds = this.quadrant.getBoundingClientRect();
      const newWidth = event.clientX - this.quadrantBounds.left;

      this.setState({quadrantWidth: `${newWidth}px`});
    }

    render() {
      return (
        <div className="quadrant" ref="quadrant" style={{width: this.state.quadrantWidth}}>
          <div className="quadrant__title">{this.props.title}</div>
          <div className="quadrant__body">
            <ComposedComponent {...this.props} entities={this.state.entities}/>
          </div>
          {(() => {
            if (this.props.resizable) {
              return (
                <QuadrantResizeHandle
                  onDragEnd={() => _.isFunction(this.props.onResizeEnd) && this.props.onResizeEnd(this.quadrantBounds)}
                  onDrag={this.recalculateQuadrantWidth.bind(this)}/>
              );
            }
          })()}
        </div>
      );
    }
  }
}
