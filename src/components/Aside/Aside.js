import React, {Component} from 'react';
import './Aside.scss';

const Pluggable = LunchBadgerCore.stores.Pluggable;

export default class Aside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pluggedTools: Pluggable.getToolGroups()
    };

    this.pluginStoreChanged = () => {
      this.setState({pluggedTools: Pluggable.getToolGroups()});
    }
  }

  componentWillMount() {
    Pluggable.addChangeListener(this.pluginStoreChanged);
  }

  componentWillUnmount() {
    Pluggable.removeChangeListener(this.pluginStoreChanged);
  }

  _renderToolGroups() {
    return this.state.pluggedTools.map((plugin, index) => {
      const ToolGroupComponent = plugin.component;
      const tools = plugin.tools;

      return (
        <ToolGroupComponent key={`tools-${plugin.name}-${index}`}
                            groupName={plugin.name}
                            tools={tools}/>
      );
    });
  }

  render() {
    return (
      <aside className="aside">
        {this._renderToolGroups()}
      </aside>
    );
  }
}
