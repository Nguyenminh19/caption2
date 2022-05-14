import React from 'react'
import './navbar.css'

// import logoDTU from "../../assets/img/logo.gif";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container" height="100%">
        <div className="container-fluid d-flex justify-content-between">
          <div className="nav-item nav-link nav-link--header">DTU</div>

          <div className="container-fluid navbar-nav d-flex flex-row justify-content-end">
            <div
              onClick={(e) => {
                e.preventDefault()
                window.location.replace('/#section-about')
              }}
              className="nav-item nav-link nav-link--header px-4"
            >
              Homepage
            </div>

            <div
              onClick={(e) => {
                e.preventDefault()
                window.location.replace('/#section-chatbox')
              }}
              className="nav-item nav-link nav-link--header  px-4"
            >
              Chat
            </div>

            <div
              onClick={(e) => {
                e.preventDefault()
                window.location.replace('/#section-members')
              }}
              className="nav-item nav-link nav-link--header  px-4"
            >
              Team
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
