import React, { useContext } from "react";
import CustomForm from "./../CustomForm";
import { FirebaseContext } from "context/firebase-context";

export default function AddProjects() {
    const { projects } = useContext(FirebaseContext);
    return <CustomForm legend='New Project' data={projects} col='Projects' />;
}
