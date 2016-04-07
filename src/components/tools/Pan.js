import React, {Component} from 'react';
import enableCanvasPanning from 'actions/AppState/enableCanvasPanning';
import disableCanvasPanning from 'actions/AppState/disableCanvasPanning';
import setWorkingTool from 'actions/AppState/setWorkingTool';
import AppState from 'stores/AppState';
import classNames from 'classnames';

export default class Pan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false
    };

    this.appStateChange = () => {
      if (AppState.getStateKey('workingTool') !== 'Pan') {
        this.disablePanning();
      }
    }
  }

  disablePanning() {
    AppState.removeChangeListener(this.appStateChange);

    setTimeout(() => {
      disableCanvasPanning();
      this.setState({enabled: false});
    });
  }

  enablePanning() {
    enableCanvasPanning();
    this.setState({enabled: true});
  }

  toggleCanvasPanning() {
    if (this.state.enabled) {
      this.disablePanning();
      setWorkingTool(null);
    } else {
      this.enablePanning();
      setWorkingTool('Pan');
      AppState.addChangeListener(this.appStateChange);
    }
  }

  render() {
    const toolClass = classNames({
      'pan': true,
      'tool': true,
      'active': this.state.enabled
    });

    return (
      <div className={toolClass} onClick={this.toggleCanvasPanning.bind(this)}>
        <i className="tool__icon fa fa-hand-paper-o"/>
        <span className="tool__tooltip">Move canvas</span>
      </div>
    );
  }
}
