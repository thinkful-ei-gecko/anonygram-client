import React from "react";
import './NavBar.css'

export default function NavBar() {
    return (
    <div className="nav-switch">
        <input type="checkbox" name="onoffswitch" className="navswitch-checkbox" id="myonoffswitch"/>
        <label className="navswitch-label" htmlFor="myonoffswitch">
            <span className="navswitch-inner"></span>
        </label>
    </div>
    );
}