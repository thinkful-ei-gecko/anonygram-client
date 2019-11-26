import React from "react";
import './NavBar.css'

export default function NavBar() {
    return (
        <div className="Navigation">
            <a href="/popular" className="nav-link" >Popular</a> 
            <a href="/newest" className="nav-link" >Newest</a>   
        </div>
        );
}