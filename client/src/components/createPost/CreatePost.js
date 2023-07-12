import React, { useState } from "react";
import "./CreatePost.scss";
import Avatar from "../Avatar/Avatar";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";

function CreatePost() {
    const [postImg, setpostImg] = useState();
    const [caption, setCaption] = useState();
    const dispatch = useDispatch();

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
            dispatch(setLoading(true));
            await axiosClient.post("/posts", {
                postImg,
                caption,
            });
        } catch (error) {
            return Promise.reject(error);
        } finally {
            dispatch(setLoading(false));
            setCaption("");
            setpostImg("");
        }
    };
    return (
        <div className="create-post">
            <div className="left-part">
                <Avatar />
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
