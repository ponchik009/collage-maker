import React from "react";

import "./App.css";

import { UploadComponent } from "./components/UploadComponent/UploadComponent";

function App() {
  const appRef = React.createRef<HTMLDivElement>();

  return (
    <div className="App" ref={appRef}>
      <div className="AppContainer">
        {Array(6)
          .fill(Math.random())
          .map((_, index) => (
            <UploadComponent key={index} anchor={appRef} />
          ))}
      </div>
    </div>
  );
}

export default App;
