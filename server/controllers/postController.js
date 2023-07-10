const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const createPostController = async (req, res) => {
    try {
        const { caption } = req.body;
        const owner = req._id;
        const user = await User.findById(req._id);
        const post = await Post.create({
            owner,
            caption,
        });

        user.posts.push(post._id);
        await user.save();

        return res.send(success(201, post));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const likeAndUnlikePostController = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, "Post not found"));
        }
        console.log(post);
        if (post.likes.includes(curUserId)) {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);
            await post.save();
            return res.send(success(200, "Post Disliked"));
        } else {
            post.likes.push(curUserId);
            await post.save();
            return res.send(success(200, "Post Liked"));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const updatePostContoller = async (req, res) => {
    try {
        const { postId, caption } = req.body;
        const curUserId = req._id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, "Post not found"));
        }
        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, "Only owners can update their posts"));
        }
        if (caption) {
            post.caption = caption;
        }

        await post.save();
        return res.send(success(200, { post }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const deletePostController = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id;
        const post = await Post.findById(postId);
        const curUser = await User.findById(curUserId);
        if (!post) {
            return res.send(error(404, "Post not found"));
        }
        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, "Only owners can delete their posts"));
        }

        const index = curUser.posts.indexOf(postId);
        curUser.posts.splice(index, 1);
        await curUser.save();
        await post.deleteOne();
        return res.send(success(200, "post deleted successfully"));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

module.exports = {
    createPostController,
    likeAndUnlikePostController,
    updatePostContoller,
    deletePostController,
};
