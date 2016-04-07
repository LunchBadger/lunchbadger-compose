import {dispatch} from 'dispatcher/AppDispatcher';

export default (toolName) => {
  dispatch('setWorkingTool', {
    toolName: toolName
  });
}
