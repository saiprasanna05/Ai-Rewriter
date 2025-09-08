// grammer component

import { useEffect, useState, useContext } from "react";
import "./TextEditor.css"; // Import styles
// import Aiplayground from "./Aiplayground";
import Paraphrase from "./Paraphrase";
import { diffWords } from "diff";
import { editorReference } from "./Editor";



const TextEditor = () => {
    // const editorRef = useRef(null); // Reference to contenteditable div

    const editorRef = useContext(editorReference)

    const [content, setContent] = useState(""); // Stores user input
    const [error, seterror] = useState("");
    const [output, setoutput] = useState([]);
    const [showgrammer, setgrammer] = useState(false)
    const [paraActive, setparaActive] = useState(false)

    useEffect(() => {
        const timer = setTimeout(async () => {
            seterror("");
            if (!content) {
                seterror("enter something!");

                return;
            }
            // console.log(content)
            try {
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: content,
                    }),
                };

                const response = await fetch(
                    "http://localhost:3000/grammererror",
                    options
                );
                const data = await response.json();
                const newvalue = data;
                // console.log(newvalue);
                if (editorRef.current) {
                    let para = JSON.stringify(editorRef.current.innerHTML);
                    const cleanHtml = (inputHtml) => {
                        return inputHtml.replace(/<(?!\/?(b|i|u)\b)[^>]+>/gi, "");
                    };
                    const cleanedHtml = cleanHtml(para);
                    let t1 = cleanedHtml.trim().split(".");
                    console.log(t1)
                    const mergedData = newvalue.map((item, index) => ({
                        ...item,
                        html: t1[index] || "" // Add HTML from array, default to empty if missing
                    }));
                    setoutput(mergedData);

                }




                // setvalue("")
            } catch (error) {
                console.error(error);
                seterror("there is some error!");
            }
        }, 3000); // 3 seconds delay

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [content]);


    const edit = (org, corrected, id) => {
        // console.log(org)
        // console.log(corrected)
        console.log(editorRef.current.innerHTML);

        if (org[0] == '"') {
            org = org.substring(1)

        }
        const extractHtmlStructure = (html) => {
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            let structuredArray = [];

            tempDiv.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    structuredArray.push({ text: node.nodeValue, tag: null });
                } else {
                    structuredArray.push({ text: node.textContent, tag: node.outerHTML.replace(node.textContent, "¤") }); // Placeholder for text
                }
            });

            return structuredArray;
        };

        // Function to rebuild variable1 while applying variable2's formatting
        const restoreHtml = (plainText, structuredHtml) => {
            let result = plainText; // Start with plain text

            structuredHtml.forEach(({ text, tag }) => {
                if (tag) {
                    // If there's a tag, replace the matching text in variable1
                    let regex = new RegExp(`\\b${text}\\b`, "gi");
                    result = result.replace(regex, tag.replace("¤", text)); // Insert text inside the original tag
                }
            });

            return result;
        };




        // Step 2: Extract HTML structure from variable2
        let structuredHtml = extractHtmlStructure(org);

        // Step 3: Apply HTML structure to variable1
        let restoredHtml = restoreHtml(corrected, structuredHtml);
        // console.log(restoredHtml)

        if (editorRef.current) {
            let htmlContent = editorRef.current.innerHTML.replace(/<(?!\/?(b|div|br|u)\b)[^>]+>/gi, "");
            // Get the plain text

            // Ensure exact match for the sentence using regex
            const escapedTarget = org.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
            const regex = new RegExp(escapedTarget, "g");
            htmlContent = htmlContent.replace(regex, restoredHtml);
            editorRef.current.innerHTML = htmlContent;

            // Replace only the exact matching sentence

        }
        setoutput(output.filter(item => item.id !== id));
        console.log(editorRef.current.innerHTML);


    }



    useEffect(() => {
        if (showgrammer) {
            setContent(editorRef.current.innerText);
            setparaActive(false)
        }
    }, [showgrammer])

    function setpara() {
        setgrammer(false);
        setparaActive(true)
    }

    const handleHighlightToggle = (selection) => {

        let htmlContent = editorRef.current.innerHTML;
        // Check if the selected text is already highlighted
        const highlightedTextPattern = new RegExp(
            `<span style="background-color: yellow; font-weight: bold;">(${selection})</span>`,
            "g"
        );

        let updatedText;

        if (highlightedTextPattern.test(htmlContent)) {
            // If highlighted, remove the highlight
            updatedText = htmlContent.replace(highlightedTextPattern, "$1");
        } else {
            // If not highlighted, apply highlight
            const normalTextPattern = new RegExp(`(${selection})`, "g");
            updatedText = htmlContent.replace(
                normalTextPattern,
                `<span style="background-color: yellow; font-weight: bold;">$1</span>`
            );
        }

        editorRef.current.innerHTML = updatedText;
    };

    function reject(id) {
        setoutput(output.filter(item => item.id !== id));
    }





    return (

        <div className="ai-playground">
            <h2>AI Playground</h2>
            {/* <p>AI-generated suggestions will appear here... <span><button >grammer</button></span></p> */}
            <div className="buttons">
                <div onClick={() => setgrammer(true)} className="gramerchecker">grammer cheacker</div>
                <div onClick={() => setpara()} className="gramerchecker">Ai Paraphraser</div>
                <div className="gramerchecker">grammer cheacker</div>
            </div>
            {(showgrammer) ? output.map((x) => {
                if (x.corrected === x.org || x.corrected == "unknown") return null;
                let newcorrect = ` ${x.corrected}`

                console.log(x)
                const differences = diffWords(x.org, x.corrected);

                return ( // ✅ Added return statement
                    (error) ? <div className="error">{error}</div> : <div key={x.id} className="grammer"> {/* ✅ Added key here */}
                        <div id="display" >
                            <div onClick={() => handleHighlightToggle(x.org)} style={{ cursor: "pointer" }}>
                                {differences.map((part, index) => {
                                    const color = part.added
                                        ? { color: "green" }
                                        : part.removed
                                            ? { textDecoration: "line-through", color: "black" }
                                            : { color: "gray" };

                                    return (
                                        <span key={index} style={color}> {/* ✅ Fixed key */}
                                            {part.value}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="actionbuttons">
                                <button onClick={() => edit(x.html, newcorrect, x.id)}>Accept</button>
                                <button onClick={() => reject(x.id)}>Reject</button>

                            </div>



                        </div>
                    </div>
                )
            }) : ""}

            {(paraActive) ? <Paraphrase paraActive={paraActive} /> : ""}

        </div>


        // </div >
    );
};

export default TextEditor;
