import React, { useState } from "react";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc, doc } from "firebase/firestore";
import CustomForm from "./../CustomForm";

export default function AddProjects() {
    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const onSubmit = async (e) => {
        setLoading(true);
        let projectTitle, projectText, projectImg;
        e.preventDefault();
        try {
            projectTitle = e.target[1].value;
            projectText = e.target[2].value;
            projectImg = e.target[3].files[0];
        } catch (e) {
            console.log(e);
            setError("invalid input:", e);
            setLoading(false);
            return;
        }

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

                    const storageRef = ref(
                        storage,
                        "images/" + projectImg.name
                    );
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
                setError("Firebase Error:", e);
                setLoading(false);
                return;
            }
        }
        setSuccess("Saved");
    };
    return <CustomForm onSubmit={onSubmit} legend='New Project' />;
}
