const { Pizza } = require("../models");

const pizzaController = {
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getPizzaByiD({ params }, res) {
        Pizza.findOne({ _id: params.id })
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
        Pizza.findOneAndUpdate({ _id: params.id },  body, { new: true })
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