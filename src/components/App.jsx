import React, { useContext } from "react";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Contacts from "./Contacts";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "reset.css";
import "index.css";

import { FirebaseContext } from "context/firebase-context";

export default function App() {
    const { data } = useContext(FirebaseContext);
    document.getElementsByTagName("html")[0].setAttribute("dir", data?.dir);

    return (
        <>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contacts />
            <Footer />
        </>
    );
}
