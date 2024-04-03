const getUser = async (req, res) => {
  try {
    const username = req.query.username;
    if (!username)
      return res.status(400).json({ message: 'Please provide a user name.' });
    const linkCollection = req.database.collection('links');
    const userCollection = req.database.collection('users');
    const link = await linkCollection.findOne(
      { username },
      { maxTimeMS: 15000 }
    );
    const user = await userCollection.findOne(
      { username },
      { maxTimeMS: 15000 }
    );
    if (!link || !user) {
      return res
        .status(400)
        .json({ message: "Couldn't found user with the given username." });
    }

    user && delete user.password;
    user && delete user.email;

    const data = {
      ...link,
      ...user,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default getUser;
