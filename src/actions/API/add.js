import { dispatch } from '../../dispatcher/AppDispatcher';
import API from '../../models/API';

export default () => {
  dispatch('AddAPI', {
    api: API.create({
      name: 'API'
    })
  });
};
