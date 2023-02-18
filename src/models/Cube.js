const mongoose = require('mongoose');
const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:[5,'Name should have atleast five characters']
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//,
        validate: {
            validator: function(value){
                return value.startsWith('http://') || value.startsWith('https://');

            },
            message: 'URL is invalid'
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
         type:mongoose.Types.ObjectId,
         ref: 'Accessory',
    },
    ],
    Owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
    }

});
const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;