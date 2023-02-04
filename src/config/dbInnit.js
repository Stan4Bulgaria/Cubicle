const mongoose = require('mongoose');
const config = require('./config');
async function dbInnit(){
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DB_URI);
    console.log('Db connected');
}
module.exports = dbInnit;
