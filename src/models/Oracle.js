import BaseModel from './BaseModel';

export default class Oracle extends BaseModel {
  constructor(id) {
    super(id);
    this.type = 'Oracle';
  }
}
