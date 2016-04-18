import React, {Component} from 'react';
import Aside from '../Aside/Aside';
import Canvas from '../Canvas/Canvas';
import Header from '../Header/Header';
import Panel from '../Panel/Panel';
import 'font-awesome/css/font-awesome.css';
import './App.scss';
import AppState from 'stores/AppState';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panelOpened: false
    };

    this.appStateUpdate = () => {
      this.setState({panelOpened: !!AppState.getStateKey('panelExpanded')});
    }
  }

  componentWillMount() {
    AppState.addChangeListener(this.appStateUpdate);
  }

  componentWillUnmount() {
    AppState.removeChangeListener(this.appStateUpdate);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Aside />
        <div className="app__container">
          <Panel opened={this.state.panelOpened} canvas={() => this.refs.canvas}/>
          <Canvas ref="canvas"/>
        </div>
      </div>
    );
  }
}
