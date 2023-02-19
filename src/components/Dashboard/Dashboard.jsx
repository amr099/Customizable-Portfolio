import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className='flex between'>
            <div className='flex flex-col dashboard'>
                <h2>Dashboard</h2>
                <Link to='content'>Content</Link>
                <Link to='links'>Links</Link>
                <Link to='addservices'>Services</Link>
                <Link to='addprojects'>Projects</Link>
            </div>
            <Outlet />
        </div>
    );
}
