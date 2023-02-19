import React, { useContext, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Contacts from "./Contacts";
import Footer from "./Footer";
import "reset.css";
import "index.css";
import { FirebaseContext } from "context/firebase-context";

export default function App() {
    const { projectsSection, servicesSection, dir } =
        useContext(FirebaseContext);
    document.getElementsByTagName("html")[0].setAttribute("dir", dir);

    return (
        <>
            <Hero />
            <About />
            {servicesSection && <Services />}
            {projectsSection && <Projects />}
            <Contacts />
            <Footer />
        </>
    );
}
