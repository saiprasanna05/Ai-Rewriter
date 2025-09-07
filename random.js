// import React, { useState } from "react";
// import { diffWords } from "diff";

// const GrammarChecker = () => {
//     const originalText = `In the heart of the bustling city, an old bookstore stood as a relic of the past. hello wth weathered pages whispered tales of hitory, romance, and adventure to those who cared to listen. The scent of aged paper filled the air, creating a sanctuary for bibliophiles seeking solace in the written word. Among the towering stacks, a young woman named Clara found herself lost in a world where time slowed, and reality blurred into fiction.

// One evening, as the golden sunset painted the sky, Clara stumbled upon an ancient manuscript bound in crimson leather. The script was ornate, its language foreign yet strangely familiar. With trembling hands, she turned the pages, feeling an inexplicable connection to the words etched centuries ago. Little did she know, this discovery would unravel secrets long buried, altering the course of her life forever.`;

//     const correctedText = `In the heart of the bustling city, an old bookstore stood as a relic of the past. Shelves lined with weathered pages whispered tales of istory, romance, and adventure to those who cared to listen. The scent of aged paper filled the air, creating a sanctuary for bibliophiles seeking solace in the written word. Among the towering stacks, a young woman named Clara found herself immersed in a world where time slowed, and reality blurred into fiction.

// One evening, as the golden sunset painted the sky, Clara stumbled upon an ancient manuscript bound in deep crimson leather. The script was ornate, its language foreign yet strangely familiar. With trembling hands, she turned the pages, feeling an inexplicable connection to the words inscribed centuries ago. Little did she know, this discovery would unveil secrets long buried, altering the course of her life forever.hel`;

//     const [modifiedText, setModifiedText] = useState(originalText);
//     const [selectedError, setSelectedError] = useState(null);

//     const differences = diffWords(modifiedText, correctedText);

//     const handleWordClick = (errorWord) => {
//         const correction = differences.find(
//             (diff) => diff.removed && diff.value.trim() === errorWord.trim()
//         );
//         const correctedWord = differences.find(
//             (diff, index) => correction && differences[index - 1] === correction && diff.added
//         );

//         setSelectedError({
//             errorWord: errorWord.trim(),
//             correctedWord: correctedWord ? correctedWord.value.trim() : ""
//         });
//     };

//     const handleAccept = () => {
//         if (selectedError) {
//             setModifiedText((prevText) =>
//                 prevText.replace(new RegExp(`\\b${selectedError.errorWord}\\b`, "g"), selectedError.correctedWord)
//             );
//             setSelectedError(null);
//         }
//     };

//     const handleReject = () => {
//         setSelectedError(null);
//     };

//     return (
//         <div style={{ display: "flex", gap: "20px" }}>
//             {/* Left: Highlighted Paragraph */}
//             <div style={{ width: "50%", border: "1px solid gray", padding: "10px" }}>
//                 <h3>Text with Errors</h3>
//                 <p style={{ whiteSpace: "pre-line" }}>
//                     {diffWords(modifiedText, correctedText).map((part, index) => {
//                         if (part.added) return null; // Do not display corrected words
//                         const isError = part.removed;
//                         return (
//                             <span
//                                 key={index}
//                                 style={{
//                                     color: isError ? "red" : "black",
//                                     cursor: isError ? "pointer" : "default",
//                                     textDecoration: isError ? "underline dotted" : "none",
//                                 }}
//                                 onClick={() => isError && handleWordClick(part.value)}
//                             >
//                                 {part.value}
//                             </span>
//                         );
//                     })}
//                 </p>
//             </div>

//             {/* Right: Correction Section */}
//             <div style={{ width: "50%", border: "1px solid gray", padding: "10px" }}>
//                 <h3>Correction</h3>
//                 {selectedError ? (
//                     <>
//                         <p>
//                             <b>Error:</b> {selectedError.errorWord}
//                         </p>
//                         <p>
//                             <b>Correction:</b> {selectedError.correctedWord}
//                         </p>
//                         <button onClick={handleAccept} style={{ marginRight: "10px" }}>
//                             ✅ Accept
//                         </button>
//                         <button onClick={handleReject}>❌ Reject</button>
//                     </>
//                 ) : (
//                     <p>Click on an error to see the correction.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default GrammarChecker;
