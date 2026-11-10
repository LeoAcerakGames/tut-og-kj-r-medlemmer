const mongoose = require('mongoose');

const medlemSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  adresse: { type: String, required: true },
  postnr: { type: String, required: true },
  poststed: { type: String, required: true },
  regnr: { type: String, required: true },
  mcType: { type: String, required: true }
});

module.exports = mongoose.model('Medlem', medlemSchema);