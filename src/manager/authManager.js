const User = require('../models/User');
const SECRET = require('../config/config').SECRET;
const jwt = require('../utils/jsonwebtoken');
exports.register = (username, password) => User.create({ username, password });
exports.getUserByUserName = (username) => User.findOne({ username });
exports.login = async (username, password) => {
    // try{
    const existingUser = await this.getUserByUserName(username);
    if (!existingUser) {

        throw new Error('Invalid username or password');
    }
    if (!await existingUser.comparePassword(password)) {

        throw new Error('Invalid username or password');

    }
    const token = await jwt.sign({ _id: existingUser._id, username: existingUser.username }, SECRET, { expiresIn: '2h' });
    return token
    //     }
    //     catch(err){

    //     }
} 