const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const errorHandler = require("../utils/error");

exports.test = async (req, res) => {
  try {
    res.status(201).json({ message: "Test API is working successfully...!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ message: "Account deleted successfully", alert: true });
  } catch (error) {
    res.status(401).json({ message: error, alert: false });
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(201, "Username must be between 7 and 20 characters")
        );
      }
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true }
    );
    let userObject = updatedUser.toObject();
    delete userObject.password;
    res
      .status(201)
      .json({
        user: updatedUser,
        message: "User updated successfully",
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const {oldPassword, newPassword} = req.body;
    const user = await UserModel.findById(req.params.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
      return res.status(201).json({ message: "Old password is incorrect", alert: false });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(req.params.id, { password: hashPassword });
    res
      .status(201)
      .json({ message: "Password updated successfully", alert: true });
  } catch (error) {
    next(error);
  }
};
