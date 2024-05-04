import { linkData } from '../../constants/linkData.js';

const getLinkData = async (req, res) => {
  try {
    return res.status(200).json(linkData);
  } catch (error) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
};

export default getLinkData;
