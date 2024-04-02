const UserModel = require('../models/user.model');
const errorHandler = require('../utils/error');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const data = await UserModel.findOne({ email });
        if(data){
            next(errorHandler(201, "User already exists"));
        }
        else{
            const user = new UserModel({ username, email, password });
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            await user.save();
            res.status(201).json({message: "User registered successfully",success: true});
        }
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await UserModel.findOne({email});
        if(!data){
            next(errorHandler(400, "User does not exist"));
        }

        if(data.password !== password){
            next(errorHandler(400, "Password is incorrect"));
        }

        res.status(201).json({data, message: "User logged in successfully", success: true});

    } catch (error) {
        next(errorHandler(500, error.message));
    }
} 