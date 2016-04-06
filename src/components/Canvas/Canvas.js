import React, {Component} from 'react';
import BackendQuadrant from '../Quadrant/BackendQuadrant';
import PrivateQuadrant from '../Quadrant/PrivateQuadrant';
import GatewaysQuadrant from '../Quadrant/GatewaysQuadrant';
import PublicQuadrant from '../Quadrant/PublicQuadrant';
import Private from '../../stores/Private';
import Public from '../../stores/Public';
import Gateway from '../../stores/Gateway';
import Backend from '../../stores/Backend';
import './Canvas.scss';
import joint from 'rappid';
import '../../joint-elements';
import {findDOMNode} from 'react-dom';

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.graph = new joint.dia.Graph();
  }

  componentDidMount() {
    const canvas = findDOMNode(this.refs.canvas);
    const canvasBounds = canvas.getBoundingClientRect();

    this.paper = new joint.dia.Paper({
      el: canvas,
      width: canvasBounds.width,
      height: canvasBounds.height,
      model: this.graph,
      gridSize: 1
    });

    this.graph.on('change:position', (cell) => {
      var parentId = cell.get('parent');
      if (!parentId) return;

      var parent = this.graph.getCell(parentId);
      var parentBbox = parent.getBBox();
      var cellBbox = cell.getBBox();

      if (parentBbox.containsPoint(cellBbox.origin()) &&
        parentBbox.containsPoint(cellBbox.topRight()) &&
        parentBbox.containsPoint(cellBbox.corner()) &&
        parentBbox.containsPoint(cellBbox.bottomLeft())) {
        return;
      }
      
      cell.set('position', cell.previous('position'));
    });
  }

  render() {
    return (
      <section className="canvas">
        <div className="canvas__wrapper">
          <div className="canvas__legend">
            <div className="canvas__label canvas__label--left">The Data</div>
            <div className="canvas__label canvas__label--right">The World</div>
          </div>

          <div className="canvas__container" ref="canvas">
            <BackendQuadrant data={Backend} graph={this.graph} resizable title="Backend"/>
            <PrivateQuadrant data={Private} graph={this.graph} resizable title="Private"/>
            <GatewaysQuadrant data={Gateway} graph={this.graph} resizable title="Gateways"/>
            <PublicQuadrant data={Public} graph={this.graph} title="Public"/>
          </div>
        </div>
      </section>
    );
  }
}
