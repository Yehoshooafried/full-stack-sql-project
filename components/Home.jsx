import React, { useState } from 'react'
import { Outlet, Link, } from "react-router-dom";

function Home() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return (
        <>
            <h1 style={{'border-bottom':'0.5px grey solid'}}> hello {userData[0].name}</h1>
            <nav className="navbar navbar-expand-lg bg-light">
                <Link class="navbar-brand" to='albums'>albums</Link>
                <Link class="navbar-brand" to='posts'>Posts</Link>
                <Link class="navbar-brand" to='todos'>Todos</Link>
                <Link class="navbar-brand" to='info'>info</Link>
                <Link class="navbar-brand" onClick={() => localStorage.removeItem("userData")} to='/'>logout</Link>
            </nav>
            <Outlet />

        </>
    );
}

export default Home;