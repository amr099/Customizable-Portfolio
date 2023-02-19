import React from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "firebase-config";

export default function AddLinks() {
    const onSubmit = (e) => {
        e.preventDefault();
        const platform = e.target[1].value;
        const url = e.target[2].value;

        try {
            setDoc(doc(db, "Links", platform), {
                platform: platform,
                url: url,
            });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <fieldset>
                <legend>New Link</legend>
                <div>
                    <label htmlFor=''>Platform</label>
                    <select name='' id=''>
                        <option value='facebook'>Facebook</option>
                        <option value='github'>Github</option>
                        <option value='linkedin'>LinkedIn</option>
                        <option value='dribbble'>Dribbble</option>
                    </select>
                </div>
                <div>
                    <label htmlFor=''>URL</label>
                    <input type='url' />
                </div>
                <button>Submit</button>
            </fieldset>
        </form>
    );
}
