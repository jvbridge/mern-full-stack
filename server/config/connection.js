import { connect, connection } from 'mongoose';
import { dbName } from './consts';

process.env.MONGODB_URI
  ? connect(process.env.MONGODB_URI, { dbName })
  : connect('mongodb://127.0.0.1:27017/' + dbName);

export default connection;
