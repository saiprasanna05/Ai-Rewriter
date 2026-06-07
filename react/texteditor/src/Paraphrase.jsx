// paraphrase component

import { useEffect, useState, useContext } from "react";
import "./TextEditor.css"; // Import styles

import { editorReference } from "./Editor";
import SuspenseLoader from "./Suspense";


const Paraphrase = (paraActive) => {
    // const editorRef = useRef(null); // Reference to contenteditable div

    const editorRef = useContext(editorReference)

    const [content, setContent] = useState(""); // Stores user input
    const [error, seterror] = useState("");
    const [res, setres] = useState("")

    useEffect(() => {
        if (paraActive) {
            setContent(editorRef.current.innerText);
        }
    }, [paraActive])

    useEffect(() => {
        const timer = setTimeout(async () => {
            console.log(content)
            seterror("");
            if (!content) {
                seterror("enter something!");

                return;
            }
            // console.log(content)
            try {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: content,
                    }),
                };

                const response = await fetch(
                    "http://localhost:3000/paraphrase",
                    options
                );
                const data = await response.json();
                const newvalue = data["text"];
                // console.log(newvalue);
                // let newval = JSON.stringify(newvalue)

                setres(newvalue)





                // setvalue("")
            } catch (error) {
                console.error(error);
                seterror("there is some error!");
            }
        }, 1000); // 3 seconds delay

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [content]);

    function insert() {
        paraActive = false;
        editorRef.current.innerText = res
        setres("")
    }








    return (

        <div className="grammer"> {/* ✅ Added key here */}
            <div id="display">
                <div>
                    {
                        (res) ? <button onClick={insert}>Insert</button> : <SuspenseLoader />
                    }

                    {
                        (error) ? <div className="error">{error}</div> : <div>{res}</div>
                    }

                </div>




            </div>
        </div>




    );
};

export default Paraphrase;
