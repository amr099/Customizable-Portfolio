import React from "react";
import Header from "./Header";
import Links from "./Links";
import Main from "./main";

export default function Hero() {
    return (
        <section className='grid rows hero'>
            <Header />
            <Main />
            <Links />
        </section>
    );
}
