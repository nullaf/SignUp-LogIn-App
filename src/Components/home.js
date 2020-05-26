import React from "react";
import image from "./img.jpg"
import "./home.scss";


function Home() {

    return (
        <div className="App">
            <img src={image} alt="Logo" className="mainImage"/>;

        </div>
    );
}

export default Home;
