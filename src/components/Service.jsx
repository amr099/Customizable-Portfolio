import React from "react";

export default function Service({ title, text, picture }) {
    return (
        <figure className='service'>
            <img src={picture} alt='' />
            <figcaption>
                <h3>{title}</h3>
                <p>{text}</p>
            </figcaption>
        </figure>
    );
}
