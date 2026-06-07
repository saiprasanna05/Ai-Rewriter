import { useState } from "react";
import "./TextEditor.css";
import Paraphrase from "./Paraphrase";

import GrammarChecker from "./grammarChecker";



const TextEditor = () => {

    const [showgrammer, setgrammer] = useState(false)
    const [paraActive, setparaActive] = useState(false)



    function setpara() {
        setgrammer(false);
        setparaActive(true)
    }

    function setgrammarcorrection() {
        setgrammer(true);
        setparaActive(false)
    }



    return (

        <div className="ai-playground">
            <h2>AI Playground</h2>
            {/* <p>AI-generated suggestions will appear here... <span><button >grammer</button></span></p> */}
            <div className="buttons">
                <div onClick={() => setgrammarcorrection()} className="gramerchecker">grammer cheacker</div>
                <div onClick={() => setpara()} className="gramerchecker">Ai Paraphraser</div>
                {/* <div className="gramerchecker">grammer cheacker</div> */}
            </div>

            {(showgrammer == true && paraActive == false) ? <GrammarChecker showgrammer={showgrammer} /> : ""}
            {(paraActive == true && showgrammer == false) ? <Paraphrase paraActive={paraActive} /> : ""}

        </div>


        // </div >
    );
};

export default TextEditor;

