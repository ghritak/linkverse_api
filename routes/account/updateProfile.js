import { ObjectId } from 'mongodb';

const updateProfile = async (req, res) => {
  try {
    const { email, name, username, bio } = req.body;
    const userCollection = req.database.collection('users');
    const linksCollection = req.database.collection('links');

    const existingUsername = await userCollection.findOne(
      { username },
      { projection: { _id: 1 } }
    );

    if (existingUsername && existingUsername._id.toString() !== req.user_id) {
      return res.status(400).json({
        message: 'Username already exists, please try another username.',
      });
    }

    let user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    if (user._id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    const usersResult = await userCollection.updateOne(
      { email: email, _id: new ObjectId(`${req.user_id}`) },
      { $set: { name, username, bio } }
    );
    const linksResult = await linksCollection.updateOne(
      { user_id: new ObjectId(`${user._id}`) },
      { $set: { username } }
    );

    if (usersResult.modifiedCount > 0 && linksResult.modifiedCount > 0) {
      return res.status(200).json({
        message: 'Profile updated successfully',
        data: { name, username, email, bio },
      });
    } else {
      return res.status(200).json({
        message: 'Profile already up to date',
        data: { name, username, email, bio },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateProfile;
