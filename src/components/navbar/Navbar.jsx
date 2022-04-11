import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container" height="100%">
        <div className="container-fluid d-flex justify-content-between">
          <Link to="/" className="nav-item nav-link nav-link--header">
            Homepage
          </Link>

          <div className="container-fluid navbar-nav d-flex flex-row justify-content-end">
            <Link
              to="/service"
              className="nav-item nav-link nav-link--header px-4"
            >
              SERVICE
            </Link>

            <Link
              to="/store"
              className="nav-item nav-link nav-link--header  px-4"
            >
              STORE
            </Link>

            <Link
              to="/about"
              className="nav-item nav-link nav-link--header  px-4"
            >
              ABOUT US
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
