import {groupName as backendGroupName} from 'components/Quadrant/BackendQuadrant';
import {groupName as privateGroupName} from 'components/Quadrant/PrivateQuadrant';
import {groupName as gatewaysGroupName} from 'components/Quadrant/GatewaysQuadrant';
import {groupName as publicGroupName} from 'components/Quadrant/PublicQuadrant';

class QuadrantSizes {
  constructor(quadrantBounds) {
    this.quadrantBounds = quadrantBounds;
  }

  getQuadrantLeftOffset(quadrant) {
    let leftOffset;

    switch (quadrant) {
      case backendGroupName:
        leftOffset = 0;
        break;

      case privateGroupName:
        leftOffset = this.quadrantBounds[backendGroupName].width;
        break;

      case gatewaysGroupName:
        leftOffset =
          this.quadrantBounds[backendGroupName].width +
          this.quadrantBounds[privateGroupName].width;
        break;

      case publicGroupName:
        leftOffset =
          this.quadrantBounds[backendGroupName].width +
          this.quadrantBounds[privateGroupName].width +
          this.quadrantBounds[gatewaysGroupName].width;
        break;
    }

    return leftOffset;
  }

  getQuadrantWidth(quadrant) {
    if (this.quadrantBounds[quadrant]) {
      return this.quadrantBounds[quadrant].width;
    }

    return undefined;
  }

  getTotalQuadrantWidth() {
    return (
      this.quadrantBounds[backendGroupName].width +
      this.quadrantBounds[privateGroupName].width +
      this.quadrantBounds[gatewaysGroupName].width +
      this.quadrantBounds[publicGroupName].width
    );
  }
}

export default QuadrantSizes;
