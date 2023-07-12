import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
function App() {
    const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
    const loadingRef = useRef(null);
    useEffect(()=>{
        if(isLoading){
            loadingRef.current?.continuousStart();
        }
        else{
            loadingRef.current?.complete();
        }
    })
    return (
        <div className="App">
            <LoadingBar color="#79afff" ref={loadingRef} />

            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route element={<RequireUser />}>
                    <Route path="/" element={<Home />}>
                        <Route path="/" element={<Feed />}></Route>
                        <Route
                            path="/profile/:userId"
                            element={<Profile />}
                        ></Route>
                        <Route
                            path="/UpdateProfile"
                            element={<UpdateProfile />}
                        ></Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
