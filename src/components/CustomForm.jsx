import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function CustomForm({ legend, data, col }) {
    const [submitState, setSubmitState] = useState({
        loading: false,
        success: false,
        error: "",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        setSubmitState({ ...submitState, loading: true });
        if (data.title) {
            try {
                const document = await doc(db, col, data.title);
                await setDoc(doc(db, col, data.title), {
                    title: data.title,
                    text: data.text,
                });
                if (data.img.length != 0) {
                    /** @type {any} */
                    const metadata = {
                        contentType: "image/jpeg",
                    };

                    const storageRef = ref(
                        storage,
                        "images/" + data.img[0].name
                    );
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        data.img[0],
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
                                    setSubmitState({
                                        ...submitState,
                                        loading: false,
                                        error: e.message,
                                    });
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
                                    updateDoc(document, {
                                        picture: downloadURL,
                                    });
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
                return;
            }
            setSubmitState({ ...submitState, success: true, loading: false });
        }
    };

    const onDelete = async (title) => {
        try {
            const res = window.confirm("Are you sure ?");
            if (res) {
                await deleteDoc(doc(db, col, title));
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className='flex flex-col form-container'>
            <Table striped responsive variant='dark' hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, index) => (
                        <tr key={index}>
                            <td>{x.title}</td>
                            <td>{x.text}</td>
                            <td>
                                <img
                                    width='50px'
                                    height='50px'
                                    src={x.picture}
                                    alt='no image'
                                />
                            </td>
                            <td>
                                <i
                                    class='bi bi-trash-fill'
                                    onClick={() => onDelete(x.title)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>
                        <h3>{legend}</h3>
                    </legend>
                    <div>
                        <label>title *</label>
                        <input {...register("title", { required: true })} />
                    </div>
                    <div>
                        <label>text</label>
                        <textarea {...register("text")}></textarea>
                    </div>
                    <div>
                        <label>img</label>
                        <input type='file' {...register("img")} />
                    </div>
                    {submitState.error && (
                        <h5 className='alert alert-danger'>Failed!</h5>
                    )}
                    {submitState.success && (
                        <h5 className='alert alert-success'>Saved.</h5>
                    )}
                    {submitState.loading ? (
                        <button
                            class='btn btn-outline-primary'
                            type='button'
                            disabled
                        >
                            <span class='spinner-border spinner-border-sm'></span>
                            Loading...
                        </button>
                    ) : (
                        <button className='btn btn-primary'>Submit</button>
                    )}
                </fieldset>
            </form>
        </div>
    );
}
