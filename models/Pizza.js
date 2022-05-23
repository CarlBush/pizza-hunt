const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },

        createdBy: {
            type: String
        },

        createdAt: {
            type: Date,
            default: Date.now,
            //GETTERS modifies the date format per utils/dateFormat.js
            get: (createdAtVal) => dateFormat(createdAtVal)
        },

        size: {
            type: String,
            default: "Large"
        },

        toppings: [],

        //RELATIONSHIP FROM COMMENTS MODEL
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//VIRTUALS | (GETS TOTAL COUN TO FCOMMETNS AND REPLIES ON RETRIEVAL)
PizzaSchema.virtual("commentCount").get(function () {
    return this.comments.length;
});

//Creates the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;