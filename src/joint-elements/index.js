import joint from 'rappid';
import jointEntity from './Entity';
import jointEntityView from './EntityView';
import jointPrivateEndpoint from './PrivateEndpoint';
import jointGateway from './Gateway';
import jointGatewayView from './GatewayView';
import jointMemory from './Memory';
import jointModel from './Model';
import jointMongo from './Mongo';
import jointOracle from './Oracle';
import jointPublicEndpoint from './PublicEndpoint';
import jointPublicEndpointView from './PublicEndpointView';
import jointAPI from './API';
import jointAPIView from './APIView';
import jointSalesforce from './Salesforce';
import jointSQL from './SQL';

joint.shapes.lunchBadger = {
  Entity: jointEntity,
  EntityView: jointEntityView,
  PrivateEndpoint: jointPrivateEndpoint,
  PrivateEndpointView: jointEntityView,
  PublicEndpoint: jointPublicEndpoint,
  PublicEndpointView: jointPublicEndpointView,
  API: jointAPI,
  APIView: jointAPIView,
  Gateway: jointGateway,
  GatewayView: jointGatewayView,
  Memory: jointMemory,
  MemoryView: jointEntityView,
  Model: jointModel,
  ModelView: jointEntityView,
  Mongo: jointMongo,
  MongoView: jointEntityView,
  Oracle: jointOracle,
  OracleView: jointEntityView,
  Salesforce: jointSalesforce,
  SalesforceView: jointEntityView,
  SQL: jointSQL,
  SQLView: jointEntityView
};

export default joint.shapes.lunchBadger;
