import React from "react";

export default function Project({ title, text }) {
    return (
        <figure className='project'>
            <img src='' alt='' />
            <figcaption>
                <h3>{title}</h3>
                <p>{text}</p>
            </figcaption>
        </figure>
    );
}
