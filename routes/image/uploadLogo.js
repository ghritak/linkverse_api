const uploadLogo = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded.' });
    return res.status(200).json({
      message: 'Logo uploaded succesfully.',
      filename: `/logo/${req.file.filename}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default uploadLogo;
