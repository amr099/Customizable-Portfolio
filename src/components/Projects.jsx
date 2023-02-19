import React, { useContext } from "react";
import Project from "./Project";
import { FirebaseContext } from "context/firebase-context";

export default function Projects() {
    const { projects } = useContext(FirebaseContext);
    return (
        <section className='projects bg'>
            <div className='container'>
                <h2>My Projects</h2>
                <div className='flex wrap around'>
                    {projects?.map((project, index) => (
                        <Project
                            key={index}
                            title={project.title}
                            text={project.text}
                            picture={project.picture}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
