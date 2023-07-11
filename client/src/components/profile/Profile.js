import React from "react";
import "./Profile.scss";
import Post from "../post/Post";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate= useNavigate()
    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img className="user-img" src="" alt="" />
                        <h3 className="user-name">xyz ASSASSIN</h3>
                        <div className="follower-info">
                            <h4>40 followers</h4>
                            <h4>12 following</h4>
                        </div>
                        <button className="follow btn-primary">Follow</button>
                        <button className="update-profile btn-secondary" onClick={()=> navigate('/UpdateProfile') }>
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
