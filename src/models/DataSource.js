import Mongo from './Mongo';
import Memory from './Memory';
import Oracle from './Oracle';
import SQL from './SQL';
import Salesforce from './Salesforce';

export default class DataSource {
  static create(type, attrs) {
    switch (type) {
      case 'Mongo':
        return Mongo.create(attrs);
      case 'Memory':
        return Memory.create(attrs);
      case 'Oracle':
        return Oracle.create(attrs);
      case 'SQL':
        return SQL.create(attrs);
      case 'Salesforce':
        return Salesforce.create(attrs);
    }
  }
}
