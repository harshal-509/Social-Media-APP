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

module.exports = router;
