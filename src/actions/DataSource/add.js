import {dispatch} from '../../dispatcher/AppDispatcher';
import DataSource from '../../models/DataSource';

export default (type) => {

  dispatch('AddDataSource', {
    dataSource: DataSource.create(type, {
      name: 'DataSource'
    })
  });
};
