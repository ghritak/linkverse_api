import bcrypt from 'bcrypt';

export const verifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const otpCollection = req.database.collection('otp');
    const user = await otpCollection.findOne({ email });

    if (user) {
      if (isExpired(user.createdAt)) {
        return res
          .status(400)
          .json({ message: 'OTP has expired, please resend.' });
      }

      const isOtpValid = await bcrypt.compare(otp, user.otp);
      if (user.email === email && isOtpValid) {
        res.status(200).json({ message: 'OTP verified successfully' });
        await otpCollection.deleteOne({ email });
      } else {
        return res.status(400).json({ message: 'Invalid verification code' });
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Please resend verification code.' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

function isExpired(dateTime) {
  const now = new Date();
  const diffInMillis = now - dateTime;
  const diffInMinutes = diffInMillis / (1000 * 60);
  return diffInMinutes > 1;
}
