import React from "react";
import "./Post.scss";
import Avatar from "../Avatar/Avatar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeandUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
function Post({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handlePostLiked() {
        dispatch(
            showToast({
                type: TOAST_SUCCESS,
                message: "Done",
            })
        );
        dispatch(
            likeandUnlikePost({
                postId: post._id,
            })
        );
    }

    return (
        <div className="Post">
            <div
                className="heading"
                on
                onClick={() => navigate(`/profile/${post.owner._id}`)}
            >
                <Avatar src={post?.owner?.Avatar?.url} />
                <h4>{post?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="" />
            </div>
            <div className="footer">
                <div className="like" onClick={handlePostLiked}>
                    {post.isLiked ? (
                        <AiFillHeart className="icon" />
                    ) : (
                        <AiOutlineHeart className="icon" />
                    )}
                    <h4>{post?.likesCount} likes</h4>
                </div>
                <p className="caption">{post?.caption}</p>
                <h6 className="time-ago">{post?.timeAgo}</h6>
            </div>
        </div>
    );
}

export default Post;
