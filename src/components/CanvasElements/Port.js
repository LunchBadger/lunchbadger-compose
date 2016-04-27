import React, {Component, PropTypes} from 'react';
import './Port.scss';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';

export default class Port extends Component {
  static propTypes = {
    elementId: PropTypes.string.isRequired,
    paper: PropTypes.object.isRequired,
    port: PropTypes.object.isRequired,
    middle: PropTypes.bool,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const portDOM = findDOMNode(this.refs.port);

    const endpointOptions = {
      maxConnections: -1,
      paintStyle: {
        fillStyle: '#c1c1c1'
      },
      connectorStyle: {
        lineWidth: 4,
        strokeStyle: '#ffffff',
        joinstyle: 'round',
        outlineColor: '#c1c1c1',
        outlineWidth: 2
      },
      connectorHoverStyle: {
        outlineColor: '#919191'
      },
      anchor: [
        [0.5, 0, 0, -1, 0, 0, 'top'],
        [1, 0.5, 1, 0, 0, 0, 'right'],
        [0.5, 1, 0, 1, 0, 0, 'bottom'],
        [0, 0.5, -1, 0, 0, 0, 'left']
      ],
      scope: this.props.scope
    };

    this.props.paper.makeSource(portDOM, {
      endpoint: ['Dot', {radius: 5}]
    }, endpointOptions);

    this.props.paper.makeTarget(portDOM, {
      endpoint: ['Dot', {radius: 5}],
      deleteEndpointsOnDetach: false
    }, endpointOptions);
  }

  componentWillUnmount() {
    const node = findDOMNode(this.refs.port);

    // this.props.paper.remove(node, false);
  }

  render() {
    const {port} = this.props;
    const portClass = classNames({
      'canvas-element__port--out': port.way === 'out',
      'canvas-element__port--in': port.way === 'in',
      'canvas-element__port': true,
      'port': true,
      'port__middle': port.middle
    });

    return (
      <div ref="port" id={`port_${port.way}_${this.props.elementId}`}
           className={`port-${port.way} ${portClass} ${this.props.className || ''}`}>
        <div className="port__inside">
        </div>
      </div>
    );
  }
}
