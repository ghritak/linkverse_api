const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;

    const userCollection = req.database.collection('users');
    const linkCollection = req.database.collection('links');

    let user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    if (user._id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    const username = user.username;
    const userResult = await userCollection.deleteOne({ email });
    const linkResult = await linkCollection.deleteOne({ username });

    if (userResult.deletedCount === 1 && linkResult.deletedCount === 1) {
      return res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default deleteAccount;
