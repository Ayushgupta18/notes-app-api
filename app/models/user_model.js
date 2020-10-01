var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const noteSchema =new Schema({
    title: { type: String },
    content: {type: String},
    created:{ type: Date, default: Date.now } 
})

const userSchema = new Schema({
    username: { type: String, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    notes: [noteSchema]
    // notes : [{ title: { type: String,unique: true, required: true }, content: String, created:{ type: Date, default: Date.now } }]
});


const User = mongoose.model('User', userSchema);
module.exports = User;