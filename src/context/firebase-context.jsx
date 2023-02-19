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

    const [dir, setDir] = useState();
    const [name, setName] = useState();
    const [mainHeading, setMainHeading] = useState();
    const [mainText, setMainText] = useState();
    const [aboutText, setAboutText] = useState();
    const [projectsSection, setProjectsSection] = useState();
    const [servicesSection, setServicesSection] = useState();
    const [mainImg, setMainImg] = useState();

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
                setMainImg(doc?.data()?.mainImg);
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
                mainImg,
                links,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
