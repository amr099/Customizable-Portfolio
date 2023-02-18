import React, { useContext } from "react";
import Nav from "./Nav";
import { FirebaseContext } from "context/firebase-context";

export default function Header() {
    const { name } = useContext(FirebaseContext);
    return (
        <header className='grid cols'>
            {/* <img
                src='https://joadre.com/wp-content/uploads/2019/02/no-image.jpg'
                alt=''
                className='logo'
            /> */}
            <h1 className='logo'>{name}</h1>
            <Nav />
        </header>
    );
}
