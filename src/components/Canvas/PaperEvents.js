import _ from 'lodash';

class PaperEvents {
  /**
   * @type {joint.dia.Paper}
   * @private
   */
  _paper = null;

  set paper(paper) {
    this._paper = paper;
  }

  get paper() {
    return this._paper;
  }

  addEvent(eventType, callback) {
    if (_.isUndefined(this._paper) || _.isNull(this._paper)) {
      throw new Error('Paper is not set');
    }

    if (_.isUndefined(eventType)) {
      throw new Error('Event type is not defined');
    }

    if (_.isUndefined(callback)) {
      throw new Error('Callback function is not defined');
    }

    this._paper.on(eventType, callback);
  }

  removeEvent(eventType, callback) {
    if (_.isUndefined(this._paper)) {
      throw new Error('Paper is not set');
    }

    this._paper.off(eventType, callback);
  }
}

export default new PaperEvents;
