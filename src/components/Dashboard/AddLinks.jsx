import React, { useContext } from "react";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "firebase-config";
import { FirebaseContext } from "context/firebase-context";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";

export default function AddLinks() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { links } = useContext(FirebaseContext);
    const onSubmit = async (data) => {
        try {
            await setDoc(doc(db, "Links", data.platform), {
                platform: data.platform,
                url: data.url,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onDelete = async (platform) => {
        try {
            await deleteDoc(doc(db, "Links", platform));
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
                        <th>Platform</th>
                        <th>URL</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {links?.map((link, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{link.platform}</td>
                            <td>{link.url}</td>
                            <td>
                                <button onClick={() => onDelete(link.platform)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>New Link</legend>
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
                    <button>Submit</button>
                </fieldset>
            </form>
        </div>
    );
}
