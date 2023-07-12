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
router.post(
    "/getUserProfile",
    requireUser,
    userController.getUserProfileController
);
router.get("/getMyPosts", requireUser, userController.getMyPostsController);
router.get("/getUserPosts", requireUser, userController.getUserPostsController);
router.delete("/", requireUser, userController.deleteMyProfileController);
router.get("/getMyInfo", requireUser, userController.getMyInfoController);
router.put("/", requireUser, userController.updateProfileController);
module.exports = router;
