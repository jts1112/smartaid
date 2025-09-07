import { MongoClient } from 'mongodb';

var _connection;
var _db;

const closeConnection = () => {
  _connection.close();
}

/**
 * start a db connection if one is not already running.
 * @returns Promise<Db> mongo Db instance
 */
export const getDbConnection = async () => {
  if (_db) {
    return _db;
  } else {
  console.log('trying to connect');
  // const mongoClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
  const mongoClient = new MongoClient(process.env.MONGODB_URI,{ minPoolSize: 2, maxPoolSize: 10 });
  _connection = await mongoClient.connect();
  _db = _connection.db("SmartAid");
  return _db;
  }
}

export default { getDbConnection, closeConnection };