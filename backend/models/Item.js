const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
  },
  type: {
    type: String,
    enum: ['Lost', 'Found'],
    required: [true, 'Item type is required'],
  },
  location: {
    type: String,
    trim: true,
    required: [true, 'Location is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  contactInfo: {
    type: String,
    trim: true,
    required: [true, 'Contact information is required'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Item', itemSchema);
