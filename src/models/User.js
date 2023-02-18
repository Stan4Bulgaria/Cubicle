const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/,'Invalid Username'],
        minLength: [5,'Username is to short'],
        unique: [true, 'Username already exists'],
    
    },
    password: {
        type: String,
        required: true,
        minLength: [8,'Password is to short mate'],
        validate: [/^[a-zA-Z0-9]+$/,'Invalid password']
    }
});
userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

});
userSchema.method('comparePassword', async function(password){
  return bcrypt.compare(password, this.password);
})
const User = mongoose.model('User', userSchema);
module.exports = User;