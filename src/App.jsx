import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Containers from "./Containers";

function App() {
  return (
    <BrowserRouter>
      <Containers />
    </BrowserRouter>
  );
}

export default App;
