const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    long: { type: Schema.Types.Decimal128, required: true },
    lati: { type: Schema.Types.Decimal128, required: true },
    mask: { type: Number, required: true }
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);