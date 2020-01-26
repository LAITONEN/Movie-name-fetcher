const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const axios = require('axios')

const PROTO_PATH = __dirname + '/urls.proto';

// The following options object closely approximates the existing behavior of grpc.load:
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const urlsProto = grpc.loadPackageDefinition(packageDefinition).urls;

const server = new grpc.Server()

server.addService(urlsProto.UrlsService.service, {
  fetch: (call) => {

    call.on('data', async function (data) {

      for (let url of data.urls) {
        const content = await axios.get(url)
        const res = { result: content.data }
        await call.write(res)
      }


    });

    call.on('end', function () {
      console.log('Connection ended.')
    });
  }
})

server.bind('127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
