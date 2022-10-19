const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promoSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true
    },
    featured: {
        type: Boolean,
        required: true,
        default: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promoSchema);

module.exports = Promotions;