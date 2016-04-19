import React, {Component, PropTypes} from 'react';
import CanvasElement from './CanvasElement';
import Port from './Port';
import ModelProperty from '../CanvasElements/Subelements/ModelProperty';
import './CanvasElement.scss';
import updateModel from '../../actions/Model/update';
import addProperty from 'actions/Model/addProperty';

class Model extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    paper: PropTypes.object,
    name: PropTypes.string.isRequired
  };

  update() {
    updateModel(this.props.entity.id, {
      name: this.props.name
    });
  }

  renderPorts() {
    return this.props.entity.ports.map((port) => {
      return (
        <Port key={`port-${port.portType}-${port.id}`}
              paper={this.props.paper}
              way={port.portType}
              elementId={this.props.entity.id}
              className={`port-${port.portType} port-${this.props.entity.constructor.type} port-${port.portGroup}`}
              scope={port.portGroup}/>
      );
    });
  }

  renderProperties() {
    return this.props.entity.properties.map((property) => {
      return (
        <ModelProperty key={`property-${property.id}`}
                       propertyKey={property.propertyKey}
                       propertyValue={property.propertyValue}/>
      );
    });
  }

  onAddProperty(key, value) {
    addProperty(this.props.entity, key, value);
  }

  render() {
    return (
      <div>
        <div>
          <div className="canvas-element__model-endpoint">
            <i className="canvas-element__model-endpoint-icon fa fa-compass"></i>
          </div>
          {this.renderPorts()}
        </div>
        <div className="canvas-element__properties expanded-only">
          <div className="canvas-element__properties__title">Properties<i onClick={() => this.onAddProperty('key', 'value')} className="canvas-element__add fa fa-plus"></i></div>

          <div className="canvas-element__properties__table">
            {this.renderProperties()}
          </div>
        </div>
      </div>

  );
  }
}

export default CanvasElement(Model);
