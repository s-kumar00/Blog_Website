const UserModel = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../OtpGenerate/sendOTP");
const OTP = require("../Models/otpModel");
const sendMail = require("../OtpGenerate/sendMail");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const data = await UserModel.findOne({ email });
    if (data) {
      next(errorHandler(201, "User already exists"));
    } else {
      const user = new UserModel({ username, email, password });
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      await user.save();
      res
        .status(201)
        .json({ message: "User registered successfully", success: true });
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });

    if (!validUser) {
      next(errorHandler(201, "User Not Found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      res.status(201).json({ message: "Invalid Password", success: false });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 10 * 3600000);
    res
      .status(201)
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .json({ user: rest, message: "Login Success", success: true });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};


exports.emailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await UserModel.findOne({ email });
    if (!data) {
      next(errorHandler(201, "User Not Found"));
    }
    const createOTP = await generateOTP(email);
    //send mail to generate otp
    const mailOptions = {
      from: process.env.USER,
      to: `${email}`,
      subject: "Password Recovery Email",
      html: `<p>Otp to change the password </p><p style="color:tomato; font-size:20px; letter-spacing:2px;"><b>${createOTP}</b></p>`,
    };
    await sendMail(mailOptions);
    const hashOTP = await bcrypt.hashSync(createOTP, 10);
    const newOTP = await new OTP({
      email,
      otp: hashOTP,
      createAt: Date.now(),
      expireAt: new Date(Date.now() + 1 * 3600 * 1000),
    });
    await newOTP.save();
    res.status(201).json({
      message: "Otp send to email Successfully",
      alert: true,
    });
  } catch (err) {
    next(err);
  }
}


exports.otpVerification = async (req, res, next) => {
  try {
    const { email, otpValue } = req.body;
    if (!(email && otpValue)) {
      res.status(201).json({ message: "Plz inter Otp", alert: false });
    }

    const otp = await OTP.findOne({ email });
    if (!otp) {
      res.status(201).json({ message: "Invalid OTP", alert: false });
    }
    
    const { expireAt } = otp;
    if (Date.now() > expireAt) {
      await OTP.deleteOne({ email });
      res.status(201).json({ message: "OTP expired", alert: false });
    }

    const isMatch = await bcrypt.compare(otpValue, otp.otp);

    if (!isMatch) {
      res.status(201).json({ message: "Invalid OTP", alert: false });
    }
    await OTP.deleteOne({ email });
    res.status(201).json({ message: "OTP verified successfully", alert: true });
  } catch (error) {
    next(error);
  }
}

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const hashPassword = await bcrypt.hashSync(password, 10);
    user.password = hashPassword;
    user.save();
    res.status(201).json({ message: "password changed successfully", alert: true });
  } catch (error) {
    next(error)
  }
}