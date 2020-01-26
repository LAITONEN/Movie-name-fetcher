const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../server/urls.proto';
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const urlsProto = grpc.loadPackageDefinition(packageDefinition).urls;

const client = new urlsProto.UrlsService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client