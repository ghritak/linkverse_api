const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const collection = req.database.collection('users');
    let user = await collection.findOne({ email }, { maxTimeMS: 15000 });

    if (user._id.toString() !== req.user_id) {
      return res.status(400).json({ message: 'Unauthorized token.' });
    }

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }

    const result = await collection.deleteOne({ email });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default deleteAccount;
