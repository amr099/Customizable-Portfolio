import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignIn() {
    const [loginError, setLoginError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const In = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate("/dashboard");
        } catch (e) {
            if (e.message === "Firebase: Error (auth/invalid-email).") {
                console.log(e.message);
                setLoginError(e.message);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                console.log(e.message);
                setLoginError(e.message);
            }
        }
    };

    return (
        <div className='container'>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(In)}>
                <div>
                    <label>E-mail{errors.email && <span>*</span>}</label>
                    <input
                        type='email'
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                </div>
                <div>
                    <label>Password{errors.password && <span>*</span>}</label>

                    <input
                        type='password'
                        {...register("password", { required: true })}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                </div>
                {loginError}
                <button>Log In</button>
            </form>
        </div>
    );
}
