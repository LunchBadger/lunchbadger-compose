import React, {Component, PropTypes} from 'react';
import Private from 'stores/Private';
import Public from 'stores/Public';
import Gateway from 'stores/Gateway';
import Backend from 'stores/Backend';
import BackendQuadrant, {groupName as backendGroupName} from '../Quadrant/BackendQuadrant';
import PrivateQuadrant, {groupName as privateGroupName} from '../Quadrant/PrivateQuadrant';
import GatewaysQuadrant, {groupName as gatewaysGroupName} from '../Quadrant/GatewaysQuadrant';
import PublicQuadrant, {groupName as publicGroupName} from '../Quadrant/PublicQuadrant';
import QuadrantSizes from 'helpers/QuadrantSizes';
import {findDOMNode} from 'react-dom';
import _ from 'lodash';

export default class Quadrants extends Component {
  static propTypes = {
    onGroupResize: PropTypes.func,
    quadrantSizes: PropTypes.instanceOf(QuadrantSizes).isRequired,
    paper: PropTypes.object,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this._handleQuadrantResize();
    });
  }

  _handleQuadrantResize() {
    const quadrantSizes = {};

    quadrantSizes[backendGroupName] = findDOMNode(this.refs.backendQuadrant).getBoundingClientRect();
    quadrantSizes[privateGroupName] = findDOMNode(this.refs.privateQuadrant).getBoundingClientRect();
    quadrantSizes[gatewaysGroupName] = findDOMNode(this.refs.gatewaysQuadrant).getBoundingClientRect();
    quadrantSizes[publicGroupName] = findDOMNode(this.refs.publicQuadrant).getBoundingClientRect();

    this.props.quadrantSizes.quadrantBounds = quadrantSizes;

    if (_.isFunction(this.props.onGroupResize)) {
      this.props.onGroupResize(this.props.quadrantSizes);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <BackendQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                         onResize={() => this._handleQuadrantResize()}
                         ref="backendQuadrant"
                         data={Backend}
                         paper={this.props.paper}
                         resizable
                         title="Backend"/>

        <PrivateQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                         onResize={() => this._handleQuadrantResize()}
                         ref="privateQuadrant"
                         data={Private}
                         paper={this.props.paper}
                         resizable
                         title="Private"/>

        <GatewaysQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                          onResize={() => this._handleQuadrantResize()}
                          ref="gatewaysQuadrant"
                          data={Gateway}
                          paper={this.props.paper}
                          resizable
                          title="Gateways"/>

        <PublicQuadrant onResizeEnd={() => this._handleQuadrantResize()}
                        onResize={() => this._handleQuadrantResize()}
                        ref="publicQuadrant"
                        data={Public}
                        paper={this.props.paper}
                        title="Public"/>
      </div>
    );
  }
}
