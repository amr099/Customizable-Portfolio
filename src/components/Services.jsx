import React from "react";
import Service from "./Service";

export default function Services() {
    return (
        <section className='services grid'>
            <div className='container'>
                <h2>Services</h2>
                <div className='flex wrap around'>
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                </div>
            </div>
        </section>
    );
}
