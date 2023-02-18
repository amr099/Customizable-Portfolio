import React from "react";
import { storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UploadImgs() {
    const uploadImg = (doc, img) => {
        const metadata = {
            contentType: "image/jpeg",
        };

        const storageRef = ref(storage, "images/" + img);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        console.log(e.target.value);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    updateDoc(doc, { img: downloadURL });
                });
            }
        );
    };
    return <input type='file' onChange={(e) => uploadImg(e)} />;
}
