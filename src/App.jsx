import React from "react";
import Gallery from "./components/Gallery";
import "./App.css"; // Corrected import statement for the CSS file

function App() {
  return (
    <div className="app">
      <h1>Tour Comparison App</h1>
      <Gallery />
    </div>
  );
}

export default App;
