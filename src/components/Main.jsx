import React from "react";

export default function Main() {
    return (
        <main className='grid cols'>
            <div className='main-paragraph'>
                <h1>Lorem ... </h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Modi beatae perspiciatis quis reiciendis? Cum nisi et enim
                    quisquam ipsa corporis numquam quam deserunt adipisci? Earum
                    voluptatibus quia aliquam alias ducimus?
                </p>
            </div>
            <img
                className='main-figure'
                src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                alt=''
            />
        </main>
    );
}
