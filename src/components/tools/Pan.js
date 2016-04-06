import React, {Component} from 'react';
import enableCanvasPanning from 'actions/AppState/enableCanvasPanning';
import disableCanvasPanning from 'actions/AppState/disableCanvasPanning';

export default class Pan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false
    };
  }

  toggleCanvasPanning() {
    if (this.state.enabled) {
      disableCanvasPanning();
      this.setState({enabled: false});
    } else {
      enableCanvasPanning();
      this.setState({enabled: true});
    }
  }

  render() {
    return (
      <div className="pan tool" onClick={this.toggleCanvasPanning.bind(this)}>
        <i className="tool__icon fa fa-hand-paper-o"/>
        <span className="tool__tooltip">Move canvas</span>
      </div>
    );
  }
}
