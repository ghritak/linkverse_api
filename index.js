import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import router from './routes/router.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
// import './cronning.js';

dotenv.config();

const app = express();

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

const client = new MongoClient(process.env.DB_URL);

let database;
const connectToMongoDB = async () => {
  try {
    await client.connect();
    database = client.db('linkverse');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
connectToMongoDB();

app.use((req, res, next) => {
  req.database = database;
  req.dbClient = client;
  next();
});

app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', router);

const PORT = 4000;

app.listen(process.env.PORT, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running,  and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
