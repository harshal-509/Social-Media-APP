import React, { useEffect, useState } from "react";
import "./Follower.scss";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";
function Follower({ user }) {
    const dispatch = useDispatch();
    const feedData = useSelector((state) => state.feedDataReducer.feedData);
    const [isFollowing, setIsFollowing] = useState();
    const navigate= useNavigate()

    useEffect(() => {
        setIsFollowing(
            feedData.followings.find((item) => item._id === user._id)
        );
    });

    function handleUserFollow(){
        dispatch(followAndUnfollowUser({
            userIdToFollow:user._id
        }))
    }

    return (
        <div className="Follower">
            <div className="user-info" onClick={() => navigate(`/profile/${user._id}`)}>
                <Avatar />
                <h4 className="name">{user.name} </h4>
            </div>
            <h5 onClick={handleUserFollow} className={isFollowing?"hover-link follow-link": "btn-primary" }>
                {isFollowing ? "UnFollow" : "Follow"}
            </h5>
        </div>
    );
}

export default Follower;
