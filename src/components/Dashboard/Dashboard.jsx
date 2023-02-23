import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className='grid cols'>
            <div className='flex flex-col around dashboard'>
                <Link to='content'>Content</Link>
                <Link to='links'>Links</Link>
                <Link to='addservices'>Services</Link>
                <Link to='addprojects'>Projects</Link>
            </div>
            <Outlet />
        </div>
    );
}
