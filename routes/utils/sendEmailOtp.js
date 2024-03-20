import nodemailer from 'nodemailer';

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

    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Invalid Email' });
    }
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verification OTP',
      html: emailTemplate(otp),
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: `An error has occured` });
      }
      return res
        .status(200)
        .json({ message: 'Verification email sent successfully.', otp });
    });

    return res.status(200).json({
      message: 'Verification email sent successfully.',
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
