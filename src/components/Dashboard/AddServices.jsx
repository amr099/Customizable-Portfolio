import React from "react";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc } from "firebase/firestore";

export default function AddServices() {
    const onSubmit = async (e) => {
        e.preventDefault();
        const serviceTitle = e.target[0].value;
        const serviceText = e.target[1].value;
        const serviceImg = e.target[2].files[0];

        if (serviceTitle && serviceText && serviceImg) {
            try {
                const servicesCol = await collection(db, "Services");
                await setDoc(servicesCol, serviceTitle, [
                    { title: serviceTitle },
                    { text: serviceText },
                ]);
                const serviceDoc = doc(servicesCol, serviceTitle);
                const storageRef = ref(storage, "images/" + ser);
                const uploadTask = uploadBytesResumable(storageRef, serviceImg);
                uploadTask.on(
                    "state_changed",
                    (error) => {
                        switch (error.code) {
                            case "storage/unauthorized":
                                break;
                            case "storage/canceled":
                                break;
                            case "storage/unknown":
                                break;
                        }
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                console.log("File available at", downloadURL);
                                updateDoc(serviceDoc, {
                                    img: downloadURL,
                                });
                            }
                        );
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
    };
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <fieldset>
                <legend>New Service</legend>
                <div>
                    <label>title</label>
                    <input />
                </div>
                <div>
                    <label>text</label>
                    <textarea></textarea>
                </div>
                <div>
                    <label>img</label>
                    <input type='file' />
                </div>
                <button>Submit</button>
            </fieldset>
        </form>
    );
}
