import "./Navbar.scss";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import {  useSelector } from "react-redux";
function Navbar() {
    const navigate = useNavigate();
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    function handleLogOutClicked() {}

    return (
        <div className="Navbar">
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate("/")}>
                    Social Media
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-link"
                        onClick={() => navigate(`/profile/${myProfile?._id}`)}
                    >
                        <Avatar src={myProfile?.Avatar?.url} />
                    </div>
                    <div
                        className="logout hover-link"
                        onClick={handleLogOutClicked}
                    >
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
