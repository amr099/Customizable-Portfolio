import React, { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "firebase-config";
import { FirebaseContext } from "context/firebase-context";
import { useForm } from "react-hook-form";

export default function Content() {
    const [submitState, setSubmitState] = useState({
        loading: false,
        success: false,
        error: "",
    });
    const { data } = useContext(FirebaseContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: data?.name,
            mainHeading: data?.mainHeading,
            mainText: data?.mainText,
            aboutText: data?.aboutText,
        },
    });

    const onSubmit = async (data) => {
        setSubmitState({ ...submitState, loading: true });
        try {
            const contentDoc = doc(db, "Content", "Content");

            if (data.dir) await updateDoc(contentDoc, { dir: data.dir });
            if (data.theme) await updateDoc(contentDoc, { theme: data.theme });
            if (data.layout)
                await updateDoc(contentDoc, { layout: data.layout });
            if (data.name) await updateDoc(contentDoc, { name: data.name });
            if (data.mainHeading)
                await updateDoc(contentDoc, { mainHeading: data.mainHeading });
            if (data.mainText)
                await updateDoc(contentDoc, { mainText: data.mainText });
            if (data.aboutText)
                await updateDoc(contentDoc, { aboutText: data.aboutText });
            if (data.mainImg.length != 0) {
                /** @type {any} */
                const metadata = {
                    contentType: "image/jpeg",
                };

                const storageRef = ref(
                    storage,
                    "images/" + data.mainImg[0].name
                );
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    data.mainImg[0],
                    metadata
                );

                await uploadTask.on(
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
                                setSubmitState({
                                    ...submitState,
                                    loading: false,
                                    error: e.message,
                                });
                                break;
                            case "storage/canceled":
                                setSubmitState({
                                    ...submitState,
                                    loading: false,
                                    error: e.message,
                                });
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
        } catch (e) {
            console.log(e);
            setSubmitState({
                ...submitState,
                loading: false,
                error: e.message,
            });
        }
        setSubmitState({ ...submitState, success: true, loading: false });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
            <div>
                <label>Language</label>
                <select {...register("dir")}>
                    <option value='ltr'>English</option>
                    <option value='rtl'>Arabic</option>
                </select>
            </div>
            <div>
                <label>Theme</label>
                <select {...register("theme")}>
                    <option value='1'>Theme 1</option>
                    <option value='2'>Theme 2</option>
                    <option value='3'>Theme 3</option>
                </select>
            </div>
            <div>
                <label>Layout</label>
                <select {...register("layout")}>
                    <option value='1'>Layout 1</option>
                    <option value='2'>Layout 2</option>
                    <option value='3'>Layout 3</option>
                </select>
            </div>
            <div>
                <label>Name</label>
                <input placeholder={data?.name} {...register("name")} />
            </div>
            <div>
                <label>Main Header</label>
                <textarea
                    placeholder={data?.mainHeading}
                    {...register("mainHeading")}
                ></textarea>
            </div>
            <div>
                <label>Main Text</label>
                <textarea
                    placeholder={data?.mainText}
                    {...register("mainText")}
                ></textarea>
            </div>
            <div>
                <label>Main Picture</label>
                <input type='file' {...register("mainImg")} />
            </div>
            <div>
                <label>About Text</label>
                <textarea
                    placeholder={data?.aboutText}
                    {...register("aboutText")}
                ></textarea>
            </div>
            {submitState.error && (
                <h5 className='alert alert-danger'>Failed!</h5>
            )}
            {submitState.success && (
                <h5 className='alert alert-success'>Saved.</h5>
            )}
            {submitState.loading ? (
                <button class='btn btn-outline-primary' type='button' disabled>
                    <span class='spinner-border spinner-border-sm'></span>
                    Loading...
                </button>
            ) : (
                <button className='btn btn-primary'>Submit</button>
            )}
        </form>
    );
}
