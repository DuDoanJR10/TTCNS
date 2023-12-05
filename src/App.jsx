import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/views/Login";
import Register from "./pages/Auth/views/Register";
import DefaultLayout from "./layouts/views/DefaultLayout";
function App() {
  return (
    <div className="App min-h-screen font-roboto">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<DefaultLayout />} />
          <Route path="*" element={<h1>Page 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
