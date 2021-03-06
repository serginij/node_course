const { Schema, model } = require('mongoose');

const fileSchema = Schema({
  type: String,
  name: String,
  data: Buffer,
});

module.exports = model('File', fileSchema);
