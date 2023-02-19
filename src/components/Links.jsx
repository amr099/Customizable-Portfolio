import React, { useContext } from "react";
import { FirebaseContext } from "context/firebase-context";

export default function Links() {
    const { links } = useContext(FirebaseContext);
    return (
        <div className='flex around links'>
            {links?.map((link, index) => (
                <a href={link.url} target='_blank' key={index}>
                    {link.platform}
                </a>
            ))}
        </div>
    );
}
