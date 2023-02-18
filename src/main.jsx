import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App";
import { FirebaseContextProvider } from "context/firebase-context";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <FirebaseContextProvider>
            <App />
        </FirebaseContextProvider>
    </React.StrictMode>
);
