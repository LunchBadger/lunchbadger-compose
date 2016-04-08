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
      paper: PropTypes.object,
      onResize: PropTypes.func,
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

      this.setState({quadrantWidth: `${newWidth}px`}, () => {
        if (_.isFunction(this.props.onResize)) {
          this.props.onResize(this.quadrantBounds);
        }
      });
    }

    render() {
      let quadrantHeight = '100%';

      if (this.props.paper) {
        const {paper} = this.props.paper;

        quadrantHeight = `${paper.svg.getAttribute('height')}px`;
      }

      return (
        <div className="quadrant" ref="quadrant"
             style={{width: this.state.quadrantWidth, height: quadrantHeight}}>
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
