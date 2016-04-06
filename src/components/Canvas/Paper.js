import {groupName as backendGroupName} from '../Quadrant/BackendQuadrant';
import {groupName as privateGroupName} from '../Quadrant/PrivateQuadrant';
import {groupName as gatewaysGroupName} from '../Quadrant/GatewaysQuadrant';
import {groupName as publicGroupName} from '../Quadrant/PublicQuadrant';
import _ from 'lodash';
import joint from 'rappid';

export default class Paper {
  constructor(canvas, graph, quadrantSizes) {
    this.canvas = canvas;
    this.graph = graph;
    this.quadrantSizes = quadrantSizes;
    this.canvasBounds = this.canvas.getBoundingClientRect();

    this.paper = new joint.dia.Paper({
      el: this.canvas,
      width: this.canvasBounds.width,
      height: this.canvasBounds.height,
      model: this.graph,
      gridSize: 1,
      restrictTranslate: this._restrictElementTranslations.bind(this)
    });
  }

  render() {
    this.resizePaper();
  }

  resizePaper({width, height} = {}) {
    let paperWidth = width;
    let paperHeight = height;
    const {backendQuadrant, privateQuadrant, gatewaysQuadrant, publicQuadrant} = this.quadrantSizes;

    if (!width) {
      paperWidth = backendQuadrant.width + privateQuadrant.width + gatewaysQuadrant.width + publicQuadrant.width;
    }

    if (!height) {
      paperHeight = this.canvasBounds.height;
    }

    this.paper.setDimensions(paperWidth, paperHeight);
  }

  _restrictElementTranslations(elementView) {
    const elementGroup = elementView.model.get('group');
    const canvasHeight = this.canvasBounds.height - this.canvasBounds.top;
    const {backendQuadrant, privateQuadrant, gatewaysQuadrant, publicQuadrant} = this.quadrantSizes;

    let fromLeft;
    let quadrantWidth;

    switch (elementGroup) {
      case backendGroupName:
        fromLeft = 0;
        quadrantWidth = backendQuadrant.width;
        break;

      case privateGroupName:
        fromLeft = backendQuadrant.width;
        quadrantWidth = privateQuadrant.width;
        break;

      case gatewaysGroupName:
        fromLeft = backendQuadrant.width + privateQuadrant.width;
        quadrantWidth = gatewaysQuadrant.width;
        break;

      case publicGroupName:
        fromLeft = backendQuadrant.width + privateQuadrant.width + gatewaysQuadrant.width;
        quadrantWidth = publicQuadrant.width;
        break;
    }

    if (_.isUndefined(fromLeft) || _.isUndefined(quadrantWidth)) {
      return;
    }

    return {
      x: fromLeft,
      y: 0,
      height: canvasHeight,
      width: quadrantWidth
    }
  }
}
