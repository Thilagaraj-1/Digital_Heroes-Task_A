import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
