const { Schema, model } = require('mongoose');

const viewSchema = new Schema({
  bookId: { type: String, required: true },
  views: { type: Number, default: 0 },
});

module.exports = model('View', viewSchema);
