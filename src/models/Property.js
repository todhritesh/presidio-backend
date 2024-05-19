const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyTitle: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  fullAddress: { type: String, required: true },
  noOfBedroom: { type: Number, required: true },
  noOfBathroom: { type: Number, required: true },
  area: { type: Number, required: true },
  contactName: { type: String, required: true },
  contactPhoneNo: { type: String, required: true },
  contactEmail: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
