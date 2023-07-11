import React from "react";
import Navbar from "../../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
function Home() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Home;
