import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App";
import { FirebaseContextProvider } from "context/firebase-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "components/Dashboard/Dashboard";
import Content from "components/Dashboard/Content";
import AddServices from "components/Dashboard/AddServices";
import AddProjects from "components/Dashboard/AddProjects";
import AddLinks from "components/Dashboard/AddLinks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "content",
                element: <Content />,
            },
            {
                path: "links",
                element: <AddLinks />,
            },
            {
                path: "addprojects",
                element: <AddProjects />,
            },
            {
                path: "addservices",
                element: <AddServices />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <FirebaseContextProvider>
            <RouterProvider router={router} />
        </FirebaseContextProvider>
    </React.StrictMode>
);
