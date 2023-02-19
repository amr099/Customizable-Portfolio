import React, { useContext } from "react";
import { FirebaseContext } from "context/firebase-context";

export default function About() {
    const { aboutText } = useContext(FirebaseContext);
    return (
        <section className='about bg'>
            <div className='container'>
                <h2>About me</h2>
                <p>{aboutText}</p>
            </div>
        </section>
    );
}
