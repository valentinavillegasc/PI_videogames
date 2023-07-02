import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Form from "./views/Form";
import Detail from "./views/Detail";

import { useSelector } from "react-redux";
function App() {
  //HOOKS

  const game = useSelector((state) => state.videogameDetail);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail game={game} />} />
      </Routes>
    </div>
  );
}

export default App;
