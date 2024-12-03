const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the .proto file
const packageDefinition = protoLoader.loadSync('helloworld.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Pastikan package diakses dengan nama yang benar
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
  callback(null, { message: `Hello, ${call.request.name}!` });
}

function main() {
  const server = new grpc.Server();
  
  // Pastikan pemanggilan service sesuai dengan definisi
  server.addService(helloProto.Greeter.service, { SayHello: sayHello });
  
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
    server.start();
  });
}

main();
