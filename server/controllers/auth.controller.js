const UserModel = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data =await UserModel.findOne({ email });

        if(data){
            res.status(201).json({message: "User already exists", success: false});
        }
        else{
            const user = new UserModel({ username, email, password });
            await user.save();
            res.status(201).json({message: "User registered successfully",success: true});
        }
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userModel.findOne({email});
        if(!data){
            return res.status(500).json({message: "User does not exist", success: false});
        }

        if(data.password !== password){
            return res.status(500).json({message: "Password is incorrect", success: false});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        data.password = hashPassword;
        await data.save();
        
        res.status(201).json({data, message: "User logged in successfully", success: true});

    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
} 