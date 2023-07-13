import React, { useState } from "react";
import "./CreatePost.scss";
import Avatar from "../Avatar/Avatar";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postSlice";

function CreatePost() {
    const [postImg, setpostImg] = useState();
    const [caption, setCaption] = useState();
    const dispatch = useDispatch();
     const myProfile =useSelector(state=>state.appConfigReducer.myProfile)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setpostImg(fileReader.result);
            }
        };
    };

    const handlePostSubmit = async () => {
        try {
            await axiosClient.post("/posts", {
                postImg,
                caption,
            });
            
            dispatch(getUserProfile({
                userId: myProfile?._id

            }));
        } catch (error) {
        } finally {
            setCaption("");
            setpostImg("");
        }
    };
    return (
        <div className="create-post">
            <div className="left-part">
                <Avatar src={myProfile?.Avatar?.url}/>
            </div>
            <div className="right-part">
                <input
                    value={caption}
                    type="text"
                    className="caption-input"
                    placeholder="Whats on your mind?"
                    onChange={(e) => {
                        setCaption(e.target.value);
                    }}
                />
                {postImg && (
                    <div className="img-container">
                        <img
                            src={postImg}
                            alt="post image"
                            className="post-img"
                        />
                    </div>
                )}
                <div className="bottom-part">
                    <div className="input-post-img">
                        <label htmlFor="userImg" className="label-img">
                            <BsCardImage />
                        </label>
                        <input
                            className="input-img"
                            id="userImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button
                        className="post-button btn-primary"
                        onClick={handlePostSubmit}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
