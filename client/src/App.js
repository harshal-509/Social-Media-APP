import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route element={<RequireUser />}>
                    <Route path="/" element={<Home />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
