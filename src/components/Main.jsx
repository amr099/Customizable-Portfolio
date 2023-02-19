import React, { useContext } from "react";
import { FirebaseContext } from "context/firebase-context";

export default function Main() {
    const { data } = useContext(FirebaseContext);
    console.log(data.mainHeading);

    return (
        <main className='grid cols'>
            <div className='main-paragraph'>
                <h1>{data.mainHeading}</h1>
                <p>{data.mainText}</p>
            </div>
            <img className='main-figure' src={data.mainImg} alt='' />
        </main>
    );
}
