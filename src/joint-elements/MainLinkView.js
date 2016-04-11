import joint, {g} from 'rappid';
import _ from 'lodash';

export default joint.dia.LinkView.extend({
  update: function() {
    this.constructor.__super__.update.call(this);
    this.model.toBack();
  },
  getConnectionPoint: function (end, selectorOrPoint, referenceSelectorOrPoint) {
    const _isPoint = (evt) => !_.isUndefined(evt.x) && !_.isUndefined(evt.y);
    const toCenter = (spotBbox) => {
      spotBbox.x = spotBbox.x + spotBbox.width / 2;
      spotBbox.y = spotBbox.y + spotBbox.height / 2;
      spotBbox.width = 0;
      spotBbox.height = 0;

      return spotBbox;
    };

    let spot;

    selectorOrPoint = selectorOrPoint || {x: 0, y: 0};
    referenceSelectorOrPoint = referenceSelectorOrPoint || {x: 0, y: 0};

    if (_isPoint(selectorOrPoint)) {
      spot = g.point(selectorOrPoint);
    } else {
      const spotBbox = end === 'source' ? toCenter(this.sourceBBox) : toCenter(this.targetBBox);
      let reference;

      if (_isPoint(referenceSelectorOrPoint)) {
        reference = g.point(referenceSelectorOrPoint);
      } else {
        const referenceBbox = end === 'source' ? this.targetBBox : this.sourceBBox;

        reference = g.rect(referenceBbox).intersectionWithLineFromCenterToPoint(g.rect(spotBbox).center());
        reference = reference || g.rect(referenceBbox).center();
      }

      if (this.paper.options.perpendicularLinks || this.options.perpendicular) {
        const horizontalLineRect = g.rect(0, reference.y, this.paper.options.width, 1);
        const verticalLineRect = g.rect(reference.x, 0, 1, this.paper.options.height);
        let nearestSide;

        if (horizontalLineRect.intersect(g.rect(spotBbox))) {
          nearestSide = g.rect(spotBbox).sideNearestToPoint(reference);
          switch (nearestSide) {
            case 'left':
              spot = g.point(spotBbox.x, reference.y);
              break;
            case 'right':
              spot = g.point(spotBbox.x + spotBbox.width, reference.y);
              break;
            default:
              spot = g.rect(spotBbox).center();
              break;
          }

        } else if (verticalLineRect.intersect(g.rect(spotBbox))) {
          nearestSide = g.rect(spotBbox).sideNearestToPoint(reference);
          switch (nearestSide) {
            case 'top':
              spot = g.point(reference.x, spotBbox.y);
              break;
            case 'bottom':
              spot = g.point(reference.x, spotBbox.y + spotBbox.height);
              break;
            default:
              spot = g.rect(spotBbox).center();
              break;
          }
        } else {
          spot = g.rect(spotBbox).intersectionWithLineFromCenterToPoint(reference);
          spot = spot || g.rect(spotBbox).center();
        }
      } else {
        spot = g.rect(spotBbox).intersectionWithLineFromCenterToPoint(reference);
        spot = spot || g.rect(spotBbox).center();
      }
    }

    return spot;
  }
});
