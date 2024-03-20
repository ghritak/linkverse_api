import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const emailTemplate = (otp) => {
  return `
    <p>Your verification OTP is: <strong>${otp}</strong></p>
    <p>Please use this OTP to complete the signup process.</p>
  `;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendVerificationEmail = async (req, res) => {
  try {
    const otp = generateOTP();
    const userEmail = 'ghritakjyotivital@gmail.com';
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Verification OTP',
      html: emailTemplate(otp),
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: `An error has occured` });
      }
      return res
        .status(200)
        .json({ message: 'Verification email sent successfully.', otp });
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
