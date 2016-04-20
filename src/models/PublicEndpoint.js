import BaseModel from './BaseModel';
import Port from './Port';
import portGroups from '../constants/portGroups';

export default class PublicEndpoint extends BaseModel {
  static type = 'PublicEndpoint';
  _ports = [];
  url = 'https://root/endpoint';

  constructor(id, name) {
    super(id);

    this.name = name;

    this.ports = [
      Port.create({
        id: this.id,
        portGroup: portGroups.PUBLIC,
        portType: 'in'
      })
    ];
  }

  get ports() {
    return this._ports;
  }

  set ports(ports) {
    this._ports = ports;
  }
}
