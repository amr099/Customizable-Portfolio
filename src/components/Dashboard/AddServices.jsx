import React, { useContext } from "react";
import CustomForm from "./../CustomForm";
import { FirebaseContext } from "context/firebase-context";

export default function AddServices() {
    const { services } = useContext(FirebaseContext);
    return <CustomForm legend='New Service' data={services} col='Services' />;
}
