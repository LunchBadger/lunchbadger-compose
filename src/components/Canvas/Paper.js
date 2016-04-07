import _ from 'lodash';
import joint from 'rappid';

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
      gridSize: 1,
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
      x: fromLeft,
      y: 0,
      height: canvasHeight,
      width: quadrantWidth
    }
  }
}
