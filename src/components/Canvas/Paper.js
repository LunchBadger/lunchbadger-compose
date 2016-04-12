import _ from 'lodash';
import joint from 'rappid';
import AppState from 'stores/AppState';
import PaperEvents from './PaperEvents';

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
      defaultLink: new joint.shapes.lunchBadger.MainLink({}),
      restrictTranslate: this._restrictElementTranslations.bind(this),
      validateConnection: this._validateConnections.bind(this),
      validateMagnet: (cellView, magnet) => {
        return magnet.getAttribute('type') !== 'input';
      }
    });

    PaperEvents.paper = this.paper;
    PaperEvents.addEvent('cell:pointerup', this._removeEmptyLinks.bind(this));
    PaperEvents.addEvent('cell:pointerup', this._reverseProxyThroughGateway.bind(this));
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

  _reverseProxyThroughGateway(elementView) {
    const elementModel = elementView.model;

    if (elementModel && elementModel.get('type') === 'lunchBadger.MainLink') {
      const targetModel = elementModel.getTargetElement();
      const sourceModel = elementModel.getSourceElement();
      const target = elementModel.get('target');
      const source = elementModel.get('source');

      if (!targetModel || !sourceModel ||
        (targetModel.get('type') !== 'lunchBadger.Gateway' && sourceModel.get('type') !== 'lunchBadger.Gateway')) {
        return;
      }

      if (sourceModel.get('type') === 'lunchBadger.Gateway') {
        sourceModel.addReverseInputProxy(source.port);

        return;
      }

      if (sourceModel.get('type') === 'lunchBadger.Model') {
        targetModel.addPublicEndpointByConnectingModel(target);
      } else if (sourceModel.get('type') === 'lunchBadger.PrivateEndpoint') {
        targetModel.addPublicModelEndpointByConnectingPrivateEndpoint(target);
      } else {
        targetModel.addInputProxy(target.port);
      }
    }
  }

  _validateConnections(cellViewStart, magnetStart, cellViewEnd, magnetEnd) {
    if (cellViewStart === cellViewEnd) {
      return false;
    }

    if (
      magnetStart &&
      magnetEnd &&
      this._checkExistingConnection(cellViewStart, cellViewEnd, magnetStart, magnetEnd)
    ) {
      return false;
    }

    return (
      magnetStart &&
      magnetEnd &&
      magnetStart.getAttribute('group') === magnetEnd.getAttribute('group') &&
      magnetEnd.getAttribute('type') === 'input'
    );
  }

  _checkExistingConnection(fromElement, toElement, fromPort, toPort) {
    const sourceLinks = this.graph.getConnectedLinks(fromElement.model);

    return sourceLinks.some((link) => {
      const target = link.get('target');
      const source = link.get('source');

      return !!(
        target.id === toElement.model.id &&
        target.port === toPort.getAttribute('port') &&
        source.port === fromPort.getAttribute('port')
      );
    });
  }

  _removeEmptyLinks() {
    const links = this.graph.getLinks();

    links.forEach((link) => {
      if (!link.getTargetElement()) {
        link.remove();
      }
    });
  }

  _restrictElementTranslations(elementView) {
    const elementGroup = elementView.model.get('group');
    const canvasHeight = this.canvasBounds.height - this.canvasBounds.top;

    const fromLeft = this.quadrantSizes.getQuadrantLeftOffset(elementGroup);
    const quadrantWidth = this.quadrantSizes.getQuadrantWidth(elementGroup);

    if (_.isUndefined(fromLeft) || _.isUndefined(quadrantWidth)) {
      return;
    }

    /**
     * TODO: canvasHeight should expand when element is close to bottom border
     */

    return {
      x: fromLeft + 0.1 * quadrantWidth,
      y: 0,
      height: canvasHeight,
      width: 0.8 * quadrantWidth
    }
  }
}
