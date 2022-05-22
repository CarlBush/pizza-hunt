const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema ({
    pizzaName : {
        type: String
    },

    createBy: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    size: {
        type: String,
        default: "Large"
    },

    toppings: []
});

//Creates the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;