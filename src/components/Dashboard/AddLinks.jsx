import React, { useContext, useState } from "react";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "firebase-config";
import { FirebaseContext } from "context/firebase-context";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";

export default function AddLinks() {
    const [submitState, setSubmitState] = useState({
        loading: false,
        success: false,
        error: false,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { links } = useContext(FirebaseContext);
    const onSubmit = async (data) => {
        setSubmitState({ ...submitState, loading: true });
        try {
            await setDoc(doc(db, "Links", data.platform), {
                platform: data.platform,
                url: data.url,
            });
        } catch (e) {
            console.log(e.message);
            setSubmitState({
                ...submitState,
                loading: false,
                error: e.message,
            });
        }
        setSubmitState({ ...submitState, success: true, loading: false });
    };

    const onDelete = async (platform) => {
        try {
            const res = window.confirm("Are you sure ?");
            if (res) {
                await deleteDoc(doc(db, "Links", platform));
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
                        <th>Platform</th>
                        <th>URL</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {links?.map((link, index) => (
                        <tr key={index}>
                            <td>{link.platform}</td>
                            <td>{link.url}</td>
                            <td>
                                <i
                                    class='bi bi-trash-fill'
                                    onClick={() => onDelete(link.platform)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>
                        <h3>New Link</h3>
                    </legend>
                    <div>
                        <label>Platform{errors.url && <span>*</span>}</label>
                        <select {...register("platform", { required: true })}>
                            <option value='facebook'>Facebook</option>
                            <option value='github'>Github</option>
                            <option value='linkedin'>LinkedIn</option>
                            <option value='dribbble'>Dribbble</option>
                        </select>
                    </div>
                    <div>
                        <label>URL{errors.url && <span>*</span>}</label>
                        <input
                            type='url'
                            {...register("url", { required: true })}
                        />
                    </div>
                    {submitState.error && (
                        <h5 className='alert alert-danger'>Failed!</h5>
                    )}
                    {submitState.success && (
                        <h5 className='alert alert-success'>New Link added.</h5>
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
