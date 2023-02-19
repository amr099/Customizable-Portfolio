import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "firebase-config";
import { FirebaseContext } from "context/firebase-context";

export default function Content() {
    const { data } = useContext(FirebaseContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        const dir = e.target[0].value;
        const theme = e.target[1].value;
        const layout = e.target[2].value;
        const name = e.target[3].value;
        const mainHeading = e.target[4].value;
        const mainText = e.target[5].value;
        const mainImg = e.target[6].files[0];
        const aboutText = e.target[7].value;

        try {
            const contentDoc = doc(db, "Content", "Content");

            if (dir) await updateDoc(contentDoc, { dir: dir });
            if (theme) await updateDoc(contentDoc, { theme: theme });
            if (layout) await updateDoc(contentDoc, { layout: layout });
            if (name) await updateDoc(contentDoc, { name: name });
            if (mainHeading)
                await updateDoc(contentDoc, { mainHeading: mainHeading });
            if (mainText) await updateDoc(contentDoc, { mainText: mainText });
            if (mainImg) {
                /** @type {any} */
                const metadata = {
                    contentType: "image/jpeg",
                };

                const storageRef = ref(storage, "images/" + mainImg.name);
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    mainImg,
                    metadata
                );

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
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
                                console.log("File available at", downloadURL);
                                updateDoc(contentDoc, { mainImg: downloadURL });
                            }
                        );
                    }
                );
            }
            if (aboutText)
                await updateDoc(contentDoc, { aboutText: aboutText });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <label>Language</label>
                <select>
                    <option value='ltr'>English</option>
                    <option value='rtl'>Arabic</option>
                </select>
            </div>
            <div>
                <label>Theme</label>
                <select>
                    <option value='1'>Theme 1</option>
                    <option value='2'>Theme 2</option>
                    <option value='3'>Theme 3</option>
                </select>
            </div>
            <div>
                <label>Layout</label>
                <select>
                    <option value='1'>Layout 1</option>
                    <option value='2'>Layout 2</option>
                    <option value='3'>Layout 3</option>
                </select>
            </div>
            <div>
                <label>Name</label>
                <input placeholder={data?.name} />
            </div>
            <div>
                <label>Main Header</label>
                <textarea placeholder={data?.mainHeading}></textarea>
            </div>
            <div>
                <label>Main Text</label>
                <textarea placeholder={data?.mainText}></textarea>
            </div>
            <div>
                <label>Main Picture</label>
                <input type='file' />
            </div>
            <div>
                <label>About Text</label>
                <textarea placeholder={data?.aboutText}></textarea>
            </div>
            <button>Save</button>
        </form>
    );
}
