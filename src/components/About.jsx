import React, { useContext } from "react";
import { FirebaseContext } from "context/firebase-context";

export default function About() {
    const { data } = useContext(FirebaseContext);
    return (
        <section className='about'>
            <div className='container'>
                <h2>About me</h2>
                <p>{data?.aboutText}</p>
            </div>
        </section>
    );
}
