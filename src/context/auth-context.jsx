import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";
import { useState } from "react";
import { auth } from "firebase-config";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}
