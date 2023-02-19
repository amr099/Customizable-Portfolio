import React from "react";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc } from "firebase/firestore";

export default function AddProjects() {
    const newProject = async (e) => {
        e.preventDefault();
        const projectTitle = e.target[1].value;
        const projectText = e.target[2].value;
        const projectImg = e.target[3].files[0];

        if (projectTitle && projectText && projectImg) {
            try {
                const projectsCol = await collection(db, "Projects");
                await setDoc(projectsCol, projectTitle, [
                    { title: proTitle },
                    { text: proText },
                ]);
                const storageRef = ref(storage, "images/" + projectImg);
                const uploadTask = uploadBytesResumable(storageRef, projectImg);
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
                                updateDoc(doc(db, "Projects", projectTitle), {
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
