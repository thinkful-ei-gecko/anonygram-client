import React from "react";
import './NavBar.css'

export default function NavBar(props) {
    const { setSort } = props;

    return (
    <div className="nav-switch">
        <input type="checkbox" name="onoffswitch" className="navswitch-checkbox" id="myonoffswitch" onClick={() => setSort()} />
        <label className="navswitch-label" htmlFor="myonoffswitch">
            <span className="navswitch-inner"></span>
        </label>
    </div>
    );
}