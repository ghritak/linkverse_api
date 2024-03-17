const getUser = async (req, res) => {
  const username = req.query.username;
  if (!username)
    return res.status(400).json({ message: 'Please provide a user name.' });
  const linkCollection = req.database.collection('links');
  const userCollection = req.database.collection('users');
  const link = await linkCollection.findOne({ username }, { maxTimeMS: 15000 });
  const user = await userCollection.findOne({ username }, { maxTimeMS: 15000 });
  if (!link && !user) {
    return res
      .status(400)
      .json({ message: "Couldn't found user with the given username." });
  }
  const data = {
    ...link,
    name: user.name,
  };
  return res.status(200).json(data);
};

export default getUser;
