import React from "react";
import Table from "react-bootstrap/Table";
import { db, storage } from "firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function CustomForm({ legend, data, col }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
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
                return;
            }
        }
    };

    const onDelete = async (title) => {
        try {
            await deleteDoc(doc(db, col, title));
            console.log(title);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className='flex flex-col form-container'>
            <Table striped responsive variant='dark' hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
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
                                <button onClick={() => onDelete(x.title)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>{legend}</legend>
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
                    <button>Submit</button>
                </fieldset>
            </form>
        </div>
    );
}
