import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { db } from "firebase-config";
import { FirebaseContext } from "context/firebase-context";
import Content from "./Dashboard/Content";
import AddProjects from "./Dashboard/AddProjects";
import AddServices from "./Dashboard/AddServices";

export default function Dashboard() {
    return (
        <div className='container'>
            <h1>Dashboard</h1>
            <Content />
            <hr />
            <AddProjects />
            <hr />
            <AddServices />
        </div>
    );
}
