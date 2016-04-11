import BaseModel from './BaseModel';

export default class SQL extends BaseModel {
  constructor(id) {
    super(id);
    this.type = 'SQL';
  }
}
