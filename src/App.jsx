import React from "react";
import MainVideoList from "./components/MainVideoList";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
export default function App () {
    return (
        <div className="bodybox">
            <NavBar />
            <MainVideoList />
            <Footer />
        </div>
    );
}
