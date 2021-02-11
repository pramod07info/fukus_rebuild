var cassandra = require('cassandra-driver');
var distance = cassandra.types.distance;
var  options = {
  contactPoints: ['127.0.0.1'],
  protocolOptions: {
    port: 9042
  },
  localDataCenter: 'datacenter1',
  keyspace: 'piece',
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 2,
      [distance.remote]: 1
    }
  },
  encoding: {
      map: Map,
      set: Set
  }
};
var client = new cassandra.Client(options);
var state = client.getState();

client.on('log', function(level, className, message, furtherInfo) {
  if (level != 'verbose') {
    console.log('cassandra: %s -- %s', level, message);
  }
});

module.exports.isLive = () => {
  client.execute('SELECT NOW() FROM system.local;', function(err, result) {
    if (err) {
      console.log("Unable to connect Cassandra...\n");
    } else {
      console.log("Cassandra Database connected...\n");
    }
  })
}

var executequery = (query) =>
  new Promise((resolve, reject) =>
  client.execute(query, function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })
);

var executequeryArrayObject = (query,params) =>
  new Promise((resolve, reject) =>
  client.execute(query,params, function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })
);

module.exports.query = (query) => {
  return executequery(query);
}
module.exports.queryArrayObject = (query,params) => {
  return executequeryArrayObject(query,params);
}
module.exports.close = () => {
  client.shutdown();
}
