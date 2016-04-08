import BaseModel from './BaseModel';

export default class Salesforce extends BaseModel {
  constructor(id) {
    super(id);
    this.type = 'Salesforce';
  }
}
