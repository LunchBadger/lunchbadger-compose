import React, {Component} from 'react';
import BackendQuadrant, {groupName as backendGroupName} from '../Quadrant/BackendQuadrant';
import PrivateQuadrant, {groupName as privateGroupName} from '../Quadrant/PrivateQuadrant';
import GatewaysQuadrant, {groupName as gatewaysGroupName} from '../Quadrant/GatewaysQuadrant';
import PublicQuadrant, {groupName as publicGroupName} from '../Quadrant/PublicQuadrant';
import Paper from './Paper';
import CanvasPan from './CanvasPan';
import Private from '../../stores/Private';
import Public from '../../stores/Public';
import Gateway from '../../stores/Gateway';
import Backend from '../../stores/Backend';
import './Canvas.scss';
import joint from 'rappid';
import '../../joint-elements';
import {findDOMNode} from 'react-dom';
import AppState from 'stores/AppState';
import classNames from 'classnames';

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.graph = new joint.dia.Graph();
    this.state = {
      quadrantSizes: {
        backendQuadrant: null,
        privateQuadrant: null,
        gatewaysQuadrant: null,
        publicQuadrant: null
      },
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
    this.paper = new Paper(this.canvas, this.graph, this.state.quadrantSizes);

    const el = new joint.shapes.basic.Rect({
      size: {
        height: 40,
        width: 40
      }
    });

    const el10 = el.clone().set('group', backendGroupName).position(100, 100);
    const el20 = el.clone().set('group', privateGroupName).position(500, 100);
    const el11 = el.clone().set('group', gatewaysGroupName).position(900, 100);
    const el21 = el.clone().set('group', publicGroupName).position(1300, 100);

    this.graph.addCells([el10, el20, el11, el21]);
    this._handleQuadrantResize();

    AppState.addChangeListener(this.appStateChange);
  }

  componentWillUnmount() {
    AppState.removeChangeListener(this.appStateChange);
  }

  _handleQuadrantResize() {
    const quadrantSizes = {
      backendQuadrant: findDOMNode(this.refs.backendQuadrant).getBoundingClientRect(),
      privateQuadrant: findDOMNode(this.refs.privateQuadrant).getBoundingClientRect(),
      gatewaysQuadrant: findDOMNode(this.refs.gatewaysQuadrant).getBoundingClientRect(),
      publicQuadrant: findDOMNode(this.refs.publicQuadrant).getBoundingClientRect()
    };

    this.setState({quadrantSizes: quadrantSizes}, () => {
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
            <div className="canvas__label canvas__label--left">The Data</div>
            <div className="canvas__label canvas__label--right">The World</div>
          </div>

          <div className="canvas__container" ref="canvas">
            <BackendQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                             ref="backendQuadrant"
                             data={Backend}
                             graph={this.graph}
                             resizable
                             title="Backend"/>

            <PrivateQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                             ref="privateQuadrant"
                             data={Private}
                             graph={this.graph}
                             resizable
                             title="Private"/>

            <GatewaysQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                              ref="gatewaysQuadrant"
                              data={Gateway}
                              graph={this.graph}
                              resizable
                              title="Gateways"/>

            <PublicQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                            ref="publicQuadrant"
                            data={Public}
                            graph={this.graph}
                            title="Public"/>
          </div>
        </div>
      </section>
    );
  }
}
