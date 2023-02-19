import React, { createContext, useEffect, useState } from "react";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "firebase-config";

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const projectsCol = collection(db, "Projects");
    const servicesCol = collection(db, "Services");
    const linksCol = collection(db, "Links");
    const [projects, ploading, perror, psnapshot] =
        useCollectionData(projectsCol);
    const [services, sloading, serror, ssnapshot] =
        useCollectionData(servicesCol);
    const [links, lloading, lerror, lsnapshot] = useCollectionData(linksCol);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getContent = async () => {
            await onSnapshot(doc(db, "Content", "Content"), (doc) => {
                setData(doc?.data());
            });
        };
        getContent();
    }, []);
    return (
        <FirebaseContext.Provider
            value={{
                data,
                links,
                services,
                projects,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
