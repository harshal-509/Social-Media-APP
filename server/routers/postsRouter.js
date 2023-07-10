const postsController = require("../controllers/postController");
const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, postsController.createPostController);
router.post("/like", requireUser, postsController.likeAndUnlikePostController);
router.put("/", requireUser, postsController.updatePostContoller);
router.delete("/", requireUser, postsController.deletePostController);

module.exports = router;
