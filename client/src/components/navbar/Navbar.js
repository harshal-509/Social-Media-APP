import React, { useState, useRef } from "react";
import "./Navbar.scss";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import LoadingBar from "react-top-loading-bar";
function Navbar() {
    const navigate = useNavigate();
    const loadingRef = useRef();

    const [loading, setloading] = useState(false);

    function toggleLoadingBar() {
        if (loading) {
            setloading(false);
            loadingRef.current.complete();
        } else {
            setloading(true);
            loadingRef.current.continuousStart();
        }
    }
    return (
        <div className="Navbar">
            <LoadingBar height={5} color="#79afff" ref={loadingRef}/>
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate("/")}>
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate("/profile/xyz")}
                    >
                        <Avatar />
                    </div>
                    <div
                        className="logout hover-link"
                        onClick={toggleLoadingBar}
                    >
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
