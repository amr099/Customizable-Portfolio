import React from "react";

export default function Service({ title, text }) {
    return (
        <figure className='service'>
            <img src='' alt='' />
            <figcaption>
                <h3>{title}</h3>
                <p>{text}</p>
            </figcaption>
        </figure>
    );
}
