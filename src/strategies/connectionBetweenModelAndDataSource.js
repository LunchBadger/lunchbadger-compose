import Backend from '../stores/Backend';

const Connection = LunchBadgerCore.stores.Connection;
const Private = LunchBadgerManage.stores.Private;
const Strategy = LunchBadgerCore.models.Strategy;
const attachConnection = LunchBadgerCore.actions.Connection.attachConnection;
const reattachConnection = LunchBadgerCore.actions.Connection.reattachConnection;

const checkConnection = (connectionInfo) => {
  const isBackend = Backend.findEntity(connectionInfo.sourceId);
  const isPrivate = Private.findEntity(connectionInfo.targetId);

  if (isBackend && isPrivate) {
    return !Connection.search({toId: Connection.formatId(connectionInfo.targetId)}).length;
  }

  return null;
};

const handleConnectionCreate = new Strategy(checkConnection, attachConnection);
const handleConnectionMove = new Strategy(checkConnection, reattachConnection);

export {handleConnectionCreate, handleConnectionMove};
