import React from "react";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className='grid cols'>
            <img
                src='https://joadre.com/wp-content/uploads/2019/02/no-image.jpg'
                alt=''
                className='logo'
            />
            <Nav />
        </header>
    );
}
