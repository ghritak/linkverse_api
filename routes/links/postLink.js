import { ObjectId } from 'mongodb';

const postLink = async (req, res) => {
  try {
    const { links } = req.body;
    const user_id = req.query.user_id;
    const collection = req.database.collection('links');
    const user = await collection.findOne({
      user_id: new ObjectId(`${user_id}`),
    });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    if (user.user_id.toString() !== req.user_id) {
      return res.status(401).json({ message: 'Unauthorized token.' });
    }

    const result = await collection.updateOne(
      { user_id: new ObjectId(`${user_id}`) },
      { $set: { links: links } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Links updated successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default postLink;
