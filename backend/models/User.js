const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  const User = mongoose.model('user', UserSchema);
  
    {/*User.createIndexes();*/} //this can be used to create index for something unique in teh database. We have added a check directly in auth.js file so we can handle error and stop duplicates from creation

  module.exports = User;  