import React from "react";

import "./App.css";

import { UploadComponent } from "./components/UploadComponent/UploadComponent";
import { Router } from "./components/Router/Router";

function App() {
  const appRef = React.createRef<HTMLDivElement>();

  return (
    <div className="App" ref={appRef}>
      <Router />
    </div>
  );
}

export default App;
