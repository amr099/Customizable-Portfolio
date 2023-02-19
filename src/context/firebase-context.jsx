import React, { createContext, useEffect, useState } from "react";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "firebase-config";

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const projectsCol = collection(db, "Projects");
    const servicesCol = collection(db, "Services");
    const [projects, ploading, perror, psnapshot] =
        useCollectionData(projectsCol);
    const [services, sloading, serror, ssnapshot] =
        useCollectionData(servicesCol);

    const [dir, setDir] = useState();
    const [name, setName] = useState();
    const [mainHeading, setMainHeading] = useState();
    const [mainText, setMainText] = useState();
    const [aboutText, setAboutText] = useState();
    const [projectsSection, setProjectsSection] = useState();
    const [servicesSection, setServicesSection] = useState();

    useEffect(() => {
        const getContent = async () => {
            await onSnapshot(doc(db, "Content", "Content"), (doc) => {
                setName(doc?.data()?.name);
                setMainHeading(doc?.data()?.mainHeading);
                setMainText(doc?.data()?.mainText);
                setAboutText(doc?.data()?.aboutText);
                setProjectsSection(doc?.data()?.projects);
                setServicesSection(doc?.data()?.services);
                setDir(doc?.data()?.dir);
            });
        };
        getContent();
    }, []);
    return (
        <FirebaseContext.Provider
            value={{
                name,
                mainHeading,
                mainText,
                aboutText,
                projects,
                services,
                projectsSection,
                servicesSection,
                dir,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
