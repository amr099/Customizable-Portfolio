import React from "react";

export default function Project({ title, text, picture }) {
    return (
        <figure className='project'>
            <img src={picture} alt='' />
            <figcaption>
                <h3>{title}</h3>
                <p>{text}</p>
            </figcaption>
        </figure>
    );
}
