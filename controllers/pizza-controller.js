const { Pizza } = require("../models");

const pizzaController = {
    getAllPizza(req, res) {
        Pizza.find({})
        //POPULATE THE ACTUALS COMMENTS RATHER THAN JUST THE ID
        .populate({
            path: "comments",
            // the minus "-" on the "_V" is stating we don't want to return this field
            select: "-_v"
        })
        //removes "_v" from being included in the data
        .select("-_v")
        //sorts from newest to oldest per timestamp
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: "comments",
            select: "-_v"
        })
        .select("-_v")
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No Pizza Found With This ID!" });
                return;
            }
            res.json(dbPizzaData);
        }).catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    updatePizza({ params, body}, res) {
        // new: true is instructing Mongoose to return the new version of the document.
        Pizza.findOneAndUpdate({ _id: params.id },  body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No Pizza Found With This ID!" });
                return;
            }
            res.json(dbPizzaData);
        }).catch(err => res.status(400).json(err));
    },

    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No Pizza Found With This ID! "});
                return;
            }
            res.json(dbPizzaData);
        }).catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;