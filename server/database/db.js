import dotenv from 'dotenv';
dotenv.config();
import { MongoClient} from 'mongodb';

let uri = process.env.LOCAL_MONGO;
let dbConnection;

const connectToDb = (callback) => {
        MongoClient.connect(`${uri}`)
        .then((client) => {
            dbConnection = client.db();
            return callback();
       })
       .catch((err) => {
              console.log(err);
              return callback(err);
        });
};

const getDb =  () => dbConnection;

export { connectToDb, getDb };