import React from 'react';

import StickyBar from "./components/stickybar/StickyBar";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single"
import Write from "./pages/write/Write";
import Contact from "./pages/contact/Contact";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
    const { user } = useContext(Context);
    return (
        <Router>
            <StickyBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={user ? <Home /> :<Register />} />
                <Route path="/login" element={user ? <Home /> :<Login />} />
                <Route path="/write" element={user ? <Write /> :<Login />} />
                <Route path="/settings" element={user ? <Settings /> :<Login />} />
                <Route path="/post/:postId" element={<Single />} />
                <Route path="/contact" element={user ? <Contact /> :<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
