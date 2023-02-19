import React from "react";

export default function CustomForm({ onSubmit, legend }) {
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <fieldset>
                <legend>{legend}</legend>
                <div>
                    <label>title</label>
                    <input />
                </div>
                <div>
                    <label>text</label>
                    <textarea></textarea>
                </div>
                <div>
                    <label>img</label>
                    <input type='file' />
                </div>
                <button>Submit</button>
            </fieldset>
        </form>
    );
}
