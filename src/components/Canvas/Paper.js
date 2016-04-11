import _ from 'lodash';
import joint from 'rappid';
import AppState from 'stores/AppState';

export default class Paper {
  /**
   * @param canvas {HTMLElement}
   * @param graph {joint.dia.Graph}
   * @param quadrantSizes {QuadrantSizes}
   */
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
      gridSize: 25,
      restrictTranslate: this._restrictElementTranslations.bind(this)
    });
  }

  render() {
    setTimeout(() => {
      this.resizePaper();
    });
  }

  resizePaper({width, height} = {}) {
    let paperWidth = width;
    let paperHeight = height;

    if (!width) {
      if (this.quadrantSizes) {
        paperWidth = this.quadrantSizes.getTotalQuadrantWidth();
      } else {
        paperWidth = this.canvasBounds.width;
      }
    }

    if (!height) {
      paperHeight = this.canvasBounds.height;
    }

    this.paper.setDimensions(paperWidth, paperHeight);
    AppState.emitChange();
  }

  changeCanvasHeight(newHeight) {
    const canvasHeight = this.canvasBounds.bottom - this.canvasBounds.top;
    const heightOffsetLimit = 100;

    if (newHeight + heightOffsetLimit > canvasHeight) {
      this.resizePaper({height: newHeight + heightOffsetLimit});
    }
  }

  _restrictElementTranslations(elementView) {
    const elementGroup = elementView.model.get('group');
    const canvasHeight = this.canvasBounds.height - this.canvasBounds.top;

    const fromLeft = this.quadrantSizes.getQuadrantLeftOffset(elementGroup);
    const quadrantWidth = this.quadrantSizes.getQuadrantWidth(elementGroup);

    if (_.isUndefined(fromLeft) || _.isUndefined(quadrantWidth)) {
      return;
    }
    
    return {
      x: fromLeft + 0.1 * quadrantWidth,
      y: 0,
      height: canvasHeight,
      width: 0.8 * quadrantWidth
    }
  }
}
