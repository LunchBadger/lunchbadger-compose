import BaseModel from './BaseModel';

export default class Memory extends BaseModel {
  constructor(id) {
    super(id);
    this.type = 'Memory';
  }
}
