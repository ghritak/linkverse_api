const getUser = async (req, res) => {
  const username = req.query.username;
  if (!username)
    return res.status(400).json({ message: 'Please provide a user name.' });
  const collection = req.database.collection('links');
  const link = await collection.findOne({ username }, { maxTimeMS: 15000 });
  if (!link) {
    return res
      .status(400)
      .json({ message: "Couldn't found user with the given username." });
  }
  return res.status(200).json(link);
};

export default getUser;
