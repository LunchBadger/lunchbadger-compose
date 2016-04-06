import BaseStore from './BaseStore';
import {register} from '../dispatcher/AppDispatcher';

let appState = {
  panning: false
};

class AppState extends BaseStore {
  constructor() {
    super();

    register(this._registerToActions.bind(this));
  }

  _registerToActions(action) {
    switch (action.type) {
      case 'enableCanvasPanning':
        this.setStateKey('panning', true);
        this.emitChange();
        break;
      case 'disableCanvasPanning':
        this.setStateKey('panning', false);
        this.emitChange();
        break;
    }
  }

  set state(state) {
    appState = state;
  }

  get state() {
    return appState;
  }

  getStateKey(key) {
    return appState[key];
  }

  setStateKey(key, value) {
    appState[key] = value;

    return this;
  }
}

export default new AppState;
