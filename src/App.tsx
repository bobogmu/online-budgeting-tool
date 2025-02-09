import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Tools from "./components/Tools/Tools";

import "./App.css";

function App() {
  return (
    <Router>
      <Header /> {/* Header component with navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/tools/*" element={<Tools />} />{" "}
        <Route path="/contact" element={<Contact />} />{" "}
        {/* About page (example) */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
