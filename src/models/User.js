const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const mechanic = this; 
  if (!mechanic.isModified('password')) return next(); 

  try {
    const salt = await bcrypt.genSalt(10); 
    mechanic.password = await bcrypt.hash(mechanic.password, salt); 
    next();
  } catch (error) {
    console.error(error);
    next(error); 
  }
});


module.exports = model('User', userSchema);




