import React from "react";
import Project from "./Project";

export default function Projects() {
    return (
        <section className='projects bg'>
            <div className='container'>
                <h2>My Projects</h2>
                <div className='flex wrap around'>
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                </div>
            </div>
        </section>
    );
}
