import React, {Component, PropTypes} from 'react';
import Quadrant from './Quadrant';
import DataSource from '../CanvasElements/DataSource';

class BackendQuadrant extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    entities: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  renderEntities() {
    return this.props.entities.map((entity) => {
      return <DataSource icon="fa-database" entity={entity}/>;
    })
  }

  render() {
    return (
      <div>
        {this.renderEntities()}
      </div>
    );
  }
}

export default Quadrant(BackendQuadrant);