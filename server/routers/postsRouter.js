const postsController = require("../controllers/postController");
const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");

router.get("/all", requireUser, postsController.getAllPostsController);

module.exports = router;
