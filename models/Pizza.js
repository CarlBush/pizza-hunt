const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema(
    {
        pizzaName: {
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