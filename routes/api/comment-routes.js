const router = require("express").Router();
const { addComment, removeComment } = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
//two routes one to delete a comment and one to know which pizza it was from
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;