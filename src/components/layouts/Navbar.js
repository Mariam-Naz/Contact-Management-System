import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                <NavLink to='/' className="navbar-brand">React Users</NavLink >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <NavLink exact to='/' className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                        <li className="nav-item">
                            <NavLink exact to='/add' className="nav-link" aria-current="page">Add Contact</NavLink>
                        </li>
                
                        </ul>
                       
                    </div>
                </div>

            </nav>
        );
}

export default Navbar;