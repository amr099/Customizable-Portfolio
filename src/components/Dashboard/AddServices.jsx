import React from "react";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc, doc } from "firebase/firestore";

export default function AddServices() {
    const onSubmit = async (e) => {
        e.preventDefault();
        const serviceTitle = e.target[1].value;
        const serviceText = e.target[2].value;
        const serviceImg = e.target[3].files[0];

        if (serviceTitle && serviceText && serviceImg) {
            const serviceDoc = await doc(db, "Services", serviceTitle);
            try {
                await setDoc(doc(db, "Services", serviceTitle), {
                    title: serviceTitle,
                    text: serviceText,
                });
                if (serviceImg) {
                    /** @type {any} */
                    const metadata = {
                        contentType: "image/jpeg",
                    };

                    const storageRef = ref(storage, "images/" + serviceImg);
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        serviceImg,
                        metadata
                    );

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                            }
                        },
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
                                    console.log(
                                        "File available at",
                                        downloadURL
                                    );
                                    updateDoc(serviceDoc, {
                                        picture: downloadURL,
                                    });
                                }
                            );
                        }
                    );
                }
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
