import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import VehicleContainer from "./components/vehicle/VehicleContainer";

const App = () => {
  return (

    <div className="App">
      <article>
        <main>
          <h2>Star Wars React Challenge</h2>
          <div className="nav-links">
            <Link className="link" to={"/vehicle"}>
              vehicle Data
            </Link>
            <Link className="link" to={"/dashboard"}>
              Home World Data
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/vehicle" />} />
            <Route path="/vehicle" element={<VehicleContainer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/star-wars-data" element={<Navigate to="/vehicle" />} />
          </Routes>
        </main>

        <footer id="footer">
          <p>Made with <span style={{ color: "red" }}>love ♥</span>  by <span style={{ color: "greenyellow" }}>Yair levi!</span><br />
            <a href="mailto:hthrkuh8@gmail.com">hthrkuh8@gmail.com</a></p>
        </footer>
      </article>
    </div >
  );
};

export default App;
