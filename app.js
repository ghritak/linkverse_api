import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import router from './routes/router.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
// import './cronning.js';

dotenv.config();

const app = express();

const client = new MongoClient(process.env.DB_URL, {
  serverSelectionTimeoutMS: 60000,
  connectTimeoutMS: 60000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;
const connectToMongoDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('client Connected.');
    database = client.db('linkverse').command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

connectToMongoDB();

app.use((req, res, next) => {
  if (database && client) {
    req.database = database;
    console.log('middleware consoled database', database);
    req.dbClient = client;
    next();
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: "Couldn't connect to MongoDB",
    });
  }
});

const allowedOrigins = process.env.ORIGINS
  ? process.env.ORIGINS.split(',')
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed);
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDirectory = path.join(__dirname, 'images');
app.use('/images', express.static(imagesDirectory));

app.get('/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(imagesDirectory, imageName));
});

app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running,  and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
