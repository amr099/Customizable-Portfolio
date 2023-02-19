import React, { useContext } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "firebase-config";
import { FirebaseContext } from "context/firebase-context";

export default function AddLinks() {
    const { links } = useContext(FirebaseContext);
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
                    <label>Platform</label>
                    <select required>
                        <option value='facebook'>Facebook</option>
                        <option value='github'>Github</option>
                        <option value='linkedin'>LinkedIn</option>
                        <option value='dribbble'>Dribbble</option>
                    </select>
                </div>
                <div>
                    <label>URL</label>
                    <input type='url' required />
                </div>
                <button>Submit</button>
            </fieldset>
        </form>
    );
}
