import React from "react";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc, doc } from "firebase/firestore";

export default function AddProjects() {
    const newProject = async (e) => {
        e.preventDefault();
        const projectTitle = e.target[1].value;
        const projectText = e.target[2].value;
        const projectImg = e.target[3].files[0];

        if (projectTitle && projectText && projectImg) {
            try {
                const projectDoc = await doc(db, "Projects", projectTitle);
                await setDoc(doc(db, "Projects", projectTitle), {
                    title: projectTitle,
                    text: projectText,
                });
                if (projectImg) {
                    /** @type {any} */
                    const metadata = {
                        contentType: "image/jpeg",
                    };

                    const storageRef = ref(storage, "images/" + projectImg);
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        projectImg,
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
                                    updateDoc(projectDoc, {
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
        <form onSubmit={(e) => newProject(e)}>
            <fieldset>
                <legend>New Project</legend>
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
