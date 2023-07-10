const router = require("express").Router();
const userController = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");

router.post(
    "/follow",
    requireUser,
    userController.followOrUnfollowUserController
);
router.post(
    "/getPostsOfFollowing",
    requireUser,
    userController.getPostOfFollowingController
);

router.get("/getMyPosts", requireUser, userController.getMyPostsController);
router.get("/getUserPosts", requireUser, userController.getUserPostsController);
router.delete("/", requireUser, userController.deleteMyProfileController);

module.exports = router;
