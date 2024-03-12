import users from '../models/UserModel.js';

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const client = req.dbClient;
    const database = client.db('linkverse');
    const collection = database.collection('users');
    // const result = await collection.find({}).toArray();
    let user_ = await collection.findOne({ email }, { maxTimeMS: 15000 });
    res.json(user_);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signup = (req, res) => {
  console.log(req, res);
  res.send('signup');
};
