import {dispatch} from '../../dispatcher/AppDispatcher';
import PublicEndpoint from '../../models/PublicEndpoint';
import _ from 'lodash';

export default (attrs) => {
  dispatch('AddPublicEndpoint', {
    endpoint: PublicEndpoint.create(_.extend({
      name: name || 'Public Endpoint'
    }, attrs))
  });
};
