const router = require("express").Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
//two routes one to delete a comment and one to know which pizza it was from
router
    .route("/:pizzaId/:commentId")
    .put(addReply)
    .delete(removeComment);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;