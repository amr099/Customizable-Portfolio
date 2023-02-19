import React, { useContext } from "react";
import { FirebaseContext } from "context/firebase-context";

export default function Main() {
    const { mainHeading, mainText, mainImg } = useContext(FirebaseContext);

    return (
        <main className='grid cols'>
            <div className='main-paragraph'>
                <h1>{mainHeading}</h1>
                <p>{mainText}</p>
            </div>
            <img className='main-figure' src={mainImg} alt='' />
        </main>
    );
}
