const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    cartItems: [],
    TotalPrice : Number,
    TotalQuantity: Number,
});

module.exports = mongoose.model("cart",cartSchema);