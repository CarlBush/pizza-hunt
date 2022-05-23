const { Comment, Pizza } = require("../models");


//COMMENT IS ONLY VISABLE WHEN VIEWING PIZZA DATA

/*Remember that when we create a comment, 
it’s not a standalone comment; it belongs to a pizza. 
We need to know exactly which pizza we’re working with.*/
//$push is the same way that it works in JavaScript—it adds data to an array

const commentController = {
    //add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId},
                { $push: { comments: _id} },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No Pizza Found With This ID!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //removeComment = delete commenthe then use its "_id" to remove it from the pizza
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            if(!deletedComment) {
                return res.stats(404).json({ message: "No Comment With This ID!" });
            }
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: "No Pizza Found With This ID!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;
