import React, { useContext } from "react";
import Service from "./Service";
import { FirebaseContext } from "context/firebase-context";

export default function Services() {
    const { services } = useContext(FirebaseContext);
    return (
        <section className='services grid'>
            <div className='container'>
                <h2>Services</h2>
                <div className='flex wrap around'>
                    {services?.map((service, index) => (
                        <Service
                            key={index}
                            title={service.title}
                            text={service.text}
                            picture={service.picture}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
