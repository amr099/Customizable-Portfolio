import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const In = async (e) => {
        e.preventDefault();
        let email = e.target[0].value;
        let password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (e) {
            if (e.message === "Firebase: Error (auth/invalid-email).") {
                setError("Invalid Email.");
                console.log(e.message);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                setError("Wrong Password.");
                console.log(e.message);
            }
        }
    };

    return (
        <div className='container'>
            <h1>Sign In</h1>
            <form onSubmit={In}>
                <div>
                    <label>E-mail</label>
                    <input type='text' />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' />
                </div>
                {error && <p>{error}</p>}
                <button> Log In</button>
            </form>
        </div>
    );
}
