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

module.exports = {
    followOrUnfollowUserController,
    getPostOfFollowingController,
};
