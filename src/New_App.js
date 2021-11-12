import React from "react";
import Game from "./components/Game";
import { Provider } from "./components/CandyContext";

const App = () => {
  return (
    <div className="app">
      <Provider children={<Game />} />
    </div>
  );
};

export default App;
