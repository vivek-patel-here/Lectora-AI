import { OTP } from "../models/otpModel.js";
import { transporter } from "../Configs/otpConfig.js";
import { getOptEmailFormat } from "../Configs/OtpEmailformate.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  await OTP.deleteMany({ email });
  const otp = generateOtp();
  const newOtp = new OTP({
    email: email,
    otp: otp,
  });

  const saveOtp = await newOtp.save();
  if (!saveOtp) {
    console.log("Error from otp Route : Unable to save otp in the database!");
    return res.status(500).json({
      success: false,
      message: "Unable to send Otp! Please Try again.",
    });
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your Lectora-AI verification OTP Code",
    html: getOptEmailFormat(otp),
  });

  res.status(200).json({ success: true, message: "OTP sent to your email!" });
};

export const verifyOtpController = async (req, res, next) => {
  const { email, otp } = req.body;
  const savedOtp = await OTP.findOne({ email });
  if (!savedOtp)
    return res.status(404).json({
      success: false,
      message: "Wrong Otp! Please Restart the process.",
    });

  if (savedOtp.attempts <= 0) {
    await OTP.deleteOne({ email }); // clean up
    return res.status(429).json({
      success: false,
      message:
        "Too many failed attempts. Please restart the verification process.",
      endProcess: true,
    });
  }

  if (savedOtp.otp !== otp) {
    //user has entered a wrong otp
    savedOtp.attempts--;
    await savedOtp.save();
    return res
      .status(401)
      .send({ success: false, message: "Wrong Otp! Enter a valid otp !" });
  }

  //if user has entered correct otp
  //delete otp from DB
  await OTP.deleteOne({ email, otp });

  req.body.isVerified = true;
  //passing to next middleware in the chain
  next();
};
