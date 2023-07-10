const { error, success } = require("../utils/responseWrapper");
const User = require("../models/User");
const Post = require("../models/Post");

const followOrUnfollowUserController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;
        const userToFollow = await User.findById(userIdToFollow);
        const curUser = await User.findById(curUserId);

        if (!userToFollow) {
            return res.send(error(404, "User not found"));
        }

        if (userIdToFollow === curUserId) {
            return res.send(error(409, "Users can not follow themselves"));
        }

        if (curUser.followings.includes(userIdToFollow)) {
            const followingindex = curUser.followings.indexOf(userIdToFollow);
            curUser.followings.splice(followingindex, 1);
            const followerindex = userToFollow.followers.indexOf(curUser);
            userToFollow.followers.splice(followerindex, 1);
            await userToFollow.save();
            await curUser.save();
            return res.send(success(200, "User unfollowed"));
        } else {
            userToFollow.followers.push(curUserId);
            curUser.followings.push(userIdToFollow);

            await userToFollow.save();
            await curUser.save();
            return res.send(success(200, "User followed"));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getPostOfFollowingController = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);
        console.log(curUser);
        const posts = await Post.find({
            owner: {
                $in: curUser.followings,
            },
        });

        return res.send(success(200, posts));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getMyPostsController = async (req, res) => {
    try {
        const curUserId = req._id;
        const allUserPosts = await Post.find({
            owner: curUserId,
        }).populate("likes");

        return res.send(success(200, { allUserPosts }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getUserPostsController = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.send(error(400, "userId is required"));
        }
        const allUserPosts = await Post.find({
            owner: userId,
        }).populate("likes");

        return res.send(success(200, { allUserPosts }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const deleteMyProfileController = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);

        await Post.deleteMany({
            owner: curUserId,
        });

        curUser.followers.forEach(async (followerId) => {
            const follower = await User.findById(followerId);
            const index = follower.followings.indexOf(curUserId);
            follower.followings.splice(index, 1);
            await follower.save();
        });

        curUser.followings.forEach(async (followingId) => {
            const following = await User.findById(followingId);
            const index = following.followers.indexOf(curUserId);
            following.followers.splice(index, 1);
            await following.save();
        });

        const allPosts = await Post.find();

        allPosts.forEach(async (post) => {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);
            await post.save();
        });

        await curUser.deleteOne();

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(200, "user deleted"));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

module.exports = {
    followOrUnfollowUserController,
    getPostOfFollowingController,
    getMyPostsController,
    getUserPostsController,
    deleteMyProfileController,
};
