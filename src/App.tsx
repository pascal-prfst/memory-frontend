import { Route, Routes } from "react-router";

import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ScorePage from "./pages/ScorePage";

function App() {
  return (
    <Routes>
      <Route element={<StartPage />} path="/"></Route>
      <Route element={<GamePage />} path="/memory"></Route>
      <Route element={<ScorePage />} path="/score"></Route>
    </Routes>
  );
}

export default App;
