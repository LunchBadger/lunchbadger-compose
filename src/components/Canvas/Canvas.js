import React, {Component} from 'react';
import Quadrants from './Quadrants';
import Paper from './Paper';
import CanvasPan from './CanvasPan';
import AppState from 'stores/AppState';
import './Canvas.scss';
import joint from 'rappid';
import '../../joint-elements';
import classNames from 'classnames';
import {findDOMNode} from 'react-dom';
import QuadrantSizes from 'helpers/QuadrantSizes';

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.graph = new joint.dia.Graph();
    this.quadrantSizes = new QuadrantSizes({});

    this.state = {
      quadrantSizes: this.quadrantSizes,
      panning: false
    };

    this.appStateChange = () => {
      this.setState({panning: AppState.getStateKey('panning')}, () => {
        this._toggleCanvasPanning();
      });
    };
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.refs.canvas);
    this.canvasBounds = this.canvas.getBoundingClientRect();
    this.canvasWrapper = findDOMNode(this.refs.canvasWrapper);

    this.canvasPan = new CanvasPan(this.canvasWrapper, this.canvas);
    this.paper = new Paper(this.canvas, this.graph);

    this._handleGroupResize(this.quadrantSizes);

    AppState.addChangeListener(this.appStateChange);
  }

  componentWillUnmount() {
    AppState.removeChangeListener(this.appStateChange);
  }

  _handleGroupResize(quadrantSizes) {
    this.setState({ quadrantSizes: quadrantSizes }, () => {
      this.paper.quadrantSizes = this.state.quadrantSizes;
      this.paper.render();
    });
  }

  _toggleCanvasPanning() {
    if (this.state.panning) {
      this.canvasPan.enableEvents();
    } else {
      this.canvasPan.disableEvents();
    }
  }

  render() {
    const canvasWrapperClass = classNames({
      'canvas__wrapper': true,
      'canvas__wrapper--panning': this.state.panning
    });

    return (
      <section className="canvas">
        <div className={canvasWrapperClass} ref="canvasWrapper">
          <div className="canvas__legend">
            <div className="canvas__label canvas__label--left">Consumers</div>
            <div className="canvas__label canvas__label--right">Producers</div>
          </div>

          <Quadrants className="canvas__container"
                     ref="canvas"
                     onGroupResize={(quadrantSizes) => this._handleGroupResize(quadrantSizes)}
                     quadrantSizes={this.state.quadrantSizes}
                     paper={this.paper}
          />
        </div>
      </section>
    );
  }
}
