import BaseModel from './BaseModel';

export default class Mongo extends BaseModel {
  constructor(id) {
    super(id);
    this.type = 'Mongo';
  }
}
