import mongoose from 'mongoose';
import { dbName } from './consts.js';

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/' + dbName,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default mongoose.connection;
