import React from "react";
import "./App.css";
import HappyFace from "./assets/happy-face.png";

const App = () => {
  return (
    <div className="app">
      <img src={HappyFace} alt="happy face" className="happy-face" />
    </div>
  );
};

export default App;
