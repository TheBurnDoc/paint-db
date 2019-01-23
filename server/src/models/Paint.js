var mongoose = require('mongoose');

const config = require('../config');

var PaintSchema = new mongoose.Schema({
  brand: {
    type: String,
    lowercase: true,
    required: [ true, "can't be blank" ],
    match: [ /^[a-zA-Z0-9]+$/, 'is invalid' ],
    index: true,
  },
  line: {
    type: String,
    lowercase: true,
    required: [ true, "can't be blank" ],
    match: [ /\S+@\S+\.\S+/, 'is invalid' ],
    index: true,
  },
  tags: {
    type: [String],
    required: [ true, "can't be empty" ],
  },
  colours: {
    type: [String],
    required: [ true, "can't be empty"],
  },
  quantity: {
    type: Number,
    required: [ true, "can't be empty" ],
  },
}, {
  timestamps: true,
});

PaintSchema.statics.findByTag = function(email, ...args) {
  return this.findOne({ email: email }, ...args);
};

PaintSchema.statics.findByColour = function(colour, ...args) {
  return this.findOne({ colour: colour }, ...args);
}

module.exports = mongoose.model('Paint', PaintSchema);
