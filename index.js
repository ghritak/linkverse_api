import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import router from './routes/router.js';

dotenv.config();

const app = express();

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
connectToMongoDB();

app.use((req, res, next) => {
  req.dbClient = client;
  next();
});

app.use(express.json());

app.use('/', router);

const PORT = 4000;

app.listen(process.env.PORT, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running,  and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
