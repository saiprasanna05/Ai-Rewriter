// main texteditor component

import { useRef, createContext } from "react";
import "./TextEditor.css"; // Import styles
import TextEditor from "./Textedit";

export const editorReference = createContext()




const Editor = () => {
    const editorRef = useRef(null); // Reference to contenteditable div

    // Execute formatting commands
    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus(); // Keep focus after formatting
    };
    const handleCopy = () => {
        const text = editorRef.current.innerText; // Get the text inside div
        navigator.clipboard.writeText(text) // Copy to clipboard
            .then(() => alert("Text copied to clipboard!"))
            .catch((err) => console.error("Failed to copy text:", err));
    };

    return (
        <div className="editor-container">
            <div className="text-editor">
                {/* Toolbar */}
                <div className="toptools">
                    <div className="toolbar">
                        <button onClick={() => formatText("justifyLeft")}>L</button>
                        <button onClick={() => formatText("justifyCenter")}>C</button>
                        <button onClick={() => formatText("justifyRight")}>R</button>
                        <button onClick={() => formatText("justifyFull")}>J</button>
                        <button onClick={() => formatText("bold")} className="bold">
                            B
                        </button>
                        <button onClick={() => formatText("italic")} className="italic">
                            I
                        </button>
                        <button onClick={() => formatText("underline")} className="underline">
                            U
                        </button>


                    </div>
                    <button onClick={() => handleCopy()}>copy</button>
                </div>

                {/* Editable Text Area */}
                <div
                    ref={editorRef}
                    className="editor-content"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                // onInput={handleInput}
                >

                </div>
            </div>

            <editorReference.Provider value={editorRef}>
                <TextEditor />
            </editorReference.Provider>

        </div >
    );
};

export default Editor;