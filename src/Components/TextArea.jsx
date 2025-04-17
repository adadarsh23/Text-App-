import React, { useState } from 'react';
import { Upload, Download } from "lucide-react";
import Alerthead from './Alert';
import { IoArrowUndo } from "react-icons/io5";
import { IoIosRedo } from "react-icons/io";
import { LuCaseLower } from "react-icons/lu";
import { LuCaseUpper } from "react-icons/lu";
import { FaCopy } from "react-icons/fa";
import { FaRemoveFormat } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { FaPaste } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";

function TextArea() {
  const [alertData, setAlertData] = useState({ head: null, desc: null });
  const [cursorPosition, setCursorPosition] = useState({ row: 1, column: 1 });
  const [history, setHistory] = useState([]); // Stack to store undo history
  const [redoStack, setRedoStack] = useState([]); // Stack to store redo history
  const [text, setText] = useState("");
  // Replace the existing font state
  const [font, setFont] = useState("Arial, sans-serif");

  const handleFontChange = (e) => {
    setFont(e.target.value);
    showAlert('Font Changed', `Font has been changed to ${e.target.value}`);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
      };
      reader.readAsText(file);
    }
  };
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "download.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const renderPreviewText = () => {
    let previewText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
    return previewText;
  };
  const handleBold = () => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (selectedText) {
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      const newText = `${beforeText}**${selectedText}**${afterText}`;
      setText(newText);
      showAlert('Bold', 'Text has been marked as bold using markdown syntax.');
    } else {
      showAlert('Selection Required', 'Please select text to make bold.');
    }
  };

  const handleItalic = () => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (selectedText) {
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      const newText = `${beforeText}_${selectedText}_${afterText}`;
      setText(newText);
      showAlert('Italic', 'Text has been marked as italic using markdown syntax.');
    } else {
      showAlert('Selection Required', 'Please select text to make italic.');
    }
  };

  const handleUnderline = () => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (selectedText) {
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      const newText = `${beforeText}<u>${selectedText}</u>${afterText}`;
      setText(newText);
      showAlert('Underline', 'Text has been underlined.');
    } else {
      showAlert('Selection Required', 'Please select text to underline.');
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop(); // Get the last state from history
      setRedoStack([text, ...redoStack]); // Save current text to redo stack
      setText(lastState); // Restore the last state
      setHistory([...history]); // Update history
      showAlert('Undo', 'The last change has been undone.');
    } else {
      showAlert('Undo', 'No more actions to undo.');
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift(); // Get the next state from redo stack
      setHistory([...history, text]); // Save current text to history
      setText(nextState); // Restore the next state
      setRedoStack([...redoStack]); // Update redo stack
      showAlert('Redo', 'The last undone change has been redone.');
    } else {
      showAlert('Redo', 'No more actions to redo.');
    }
  };


  const showAlert = (head, desc) => {
    setAlertData({ head, desc });
  };
  const [myStyle, setMyStyle] = useState({
    color: 'black',
    backgroundColor: 'white',
    letterSpacing: '0.05em',
    textShadow: '2px 2px 10px rgba(0,0,0,0.2)',
  });

  const toggleButton = () => {
    if (myStyle.color === 'black') {
      setMyStyle({ color: 'white', backgroundColor: 'black' });
      showAlert('Dark Mode Enabled', 'You have switched to dark mode.');
    } else {
      setMyStyle({ color: 'black', backgroundColor: 'white' });
      showAlert('Light Mode Enabled', 'You have switched to light mode.');
    }
  };
  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      showAlert('Text Pasted', 'The text has been pasted from the clipboard.');
    } catch (error) {
      showAlert('Error', 'Failed to read text from the clipboard.');
      console.error('Error reading clipboard text:', error);
    }
  };
  const findWord = () => {
    const wordToFind = prompt("Enter the word to find:");
    if (!wordToFind) {
      showAlert("No Word Entered", "Please enter a word to search.");
      return;
    }

    const textarea = document.getElementById("editor");
    const text = textarea.value;

    if (text.includes(wordToFind)) {
      showAlert("Word Found", `The word "${wordToFind}" was found in the text.`);
      const startIndex = text.indexOf(wordToFind);
      textarea.focus();
      textarea.setSelectionRange(startIndex, startIndex + wordToFind.length);
    } else {
      showAlert("Word Not Found", `The word "${wordToFind}" was not found in the text.`);
    }
  };

  const printSelectedText = () => {
    const textarea = document.getElementById('editor');
    const selectedText = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );
    if (selectedText) {
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Selected Text</title>
          </head>
          <body>
            <pre>${selectedText}</pre>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      showAlert('No Text Selected', 'Please select some text to print.');
    }
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    showAlert('Lowercase Conversion', 'Text has been converted to lowercase.');
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    showAlert('Uppercase Conversion', 'Text has been converted to uppercase.');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    showAlert('Text Copied', 'The text has been copied to the clipboard.');
  };

  const handleReSpace = () => {
    let newText = text.replace(/\s+/g, ' ').trim();
    setText(newText);
    showAlert('Extra Spaces Removed', 'All extra spaces have been removed.');
  };
  const handleOnClear = () => {
    setText('');
    showAlert('Text Cleared', 'All text has been cleared.');
  };

  const handleChange = (event) => {
    const textarea = event.target;
    const cursorIndex = textarea.selectionStart;

    // Calculate row and column
    const rows = text.substring(0, cursorIndex).split('\n');
    const currentRow = rows.length;
    const currentColumn = rows[rows.length - 1].length + 1;

    setCursorPosition({ row: currentRow, column: currentColumn });
    setHistory([...history, text]); // Save current text to history before updating
    setRedoStack([]); // Clear redo stack on new input
    setText(event.target.value);
  };

  return (
    <>
      <main style={myStyle}>
        <Alerthead head={alertData.head} desc={alertData.desc} />
        <div className="flex flex-end justify-end">
          <label className="plane-switch">
            <input type="checkbox" onClick={toggleButton} />
            <div>
              <div>
                <svg viewBox="0 0 13 13">
                  <path d="M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 Z" fill="currentColor"></path>
                </svg>
              </div>
              <span className="street-middle"></span>
              <span className="cloud"></span>
              <span className="cloud two"></span>
            </div>
          </label>
        </div>
        <h1
          className="mt-4 mb-4 text-5xl text-center font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text underline decoration-black/30"
          style={myStyle}
        >
          Text - Edit the Text
        </h1>
        <div className="container mx-auto my-5 id1 rounded" style={myStyle}>
          <form style={myStyle}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600" style={myStyle}>
              <div className="flex  flex-wrap justify-center items-center px-3 py-2 border-b dark:border-gray-600" style={myStyle}>
                <div className='flex flex-wrap justify-center items-center'>
                  <div className="id1 border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <button
                      type="button"
                      title="Undo"
                      className="inline-flex items-center px-2.5 py-2.5 me-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded"
                      onClick={handleUndo}
                    >
                      <IoArrowUndo />
                    </button>
                    <button
                      type="button"
                      title="Redo"
                      className="inline-flex items-center px-2.5 py-2.5 mr-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded"
                      onClick={handleRedo}
                    >
                      <IoIosRedo />
                    </button>
                  </div>
                  <div className="id1 border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <button
                      type="button"
                      title="Bold"
                      className="inline-flex items-center px-2.5 py-2.5 me-2 text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded"
                      onClick={handleBold}
                    >
                      <FaBold />
                    </button>
                    <button
                      type="button"
                      title="Italic"
                      className="inline-flex items-center px-2.5 py-2.5 me-2 text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded"
                      onClick={handleItalic}
                    >
                      <FaItalic />
                    </button>
                    <button
                      type="button"
                      title="Underline"
                      className="inline-flex items-center px-2.5 py-2.5  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded"
                      onClick={handleUnderline}
                    >
                      <FaUnderline />
                    </button>
                  </div>
                  <div className="id1 border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <button type="button"
                      text="Lowercase"
                      title="Lowercase"
                      className="inline-flex items-center px-2.5 py-2.5 me-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={handleLoClick}>
                      <LuCaseLower />
                    </button>
                    <button type="button"
                      text="Uppercase"
                      title="Uppercase"
                      className="inline-flex items-center px-2.5 py-2.5  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={handleUpClick}>
                      <LuCaseUpper />
                    </button>
                  </div>
                  <div className=" id1 border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <button type="button"
                      text="Copy"
                      title="Copy"
                      className="inline-flex items-center px-2.5 py-2.5 me-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={handleCopyClick}>
                      <FaCopy />
                    </button>
                    <button type="button"
                      text="Paste"
                      title="Paste"
                      className="inline-flex items-center px-2.5 py-2.5 me-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={handlePasteClick}>
                      <FaPaste />
                    </button>
                    <button type="button"
                      text="Clear"
                      title="Clear"
                      className="inline-flex items-center px-2.5 py-2.5  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={handleOnClear}>
                      <MdClear />
                    </button>
                  </div>
                  <div className=" id1 border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <button type="button"
                      text="Remove Space"
                      title="Remove Space"
                      className="inline-flex items-center px-2.5 py-2.5  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={handleReSpace}>
                      <FaRemoveFormat />
                    </button>
                  </div>
                  <div className="id1 border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <button type="button"
                      text="Find"
                      title="Find"
                      className="inline-flex items-center px-2.5 py-2.5 me-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={findWord}>
                      <MdFindInPage />
                    </button>
                    <button type="button"
                      text="Print"
                      title="Print"
                      className="inline-flex items-center px-2.5 py-2.5  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded" onClick={printSelectedText}>
                      <IoIosPrint />
                    </button>
                  </div>
                  <div >
                   <div className="id1 flex flex-norwrap justify-end border-1 border-gray-200 rounded-lg pt-2 pb-2 pl-1 pr-1" style={myStyle} >
                    <label text="choose file"
                      title="choose file" className="inline-flex items-center px-2.5 py-2.5 me-2  text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center px-2.5 py-2.5 me-2 text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-950 text-white font-bold rounded"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <select
                      onChange={handleFontChange}
                      className="p-2 border rounded-xl shadow-md"
                      style={{ backgroundColor: myStyle.backgroundColor, color: myStyle.color }}
                      value={font}>
                      {/* Sans-serif Fonts */}
                      <option value="Arial, sans-serif">Arial</option>
                      <option value="Verdana, sans-serif">Verdana</option>
                      <option value="Helvetica, sans-serif">Helvetica</option>
                      <option value="Tahoma, sans-serif">Tahoma</option>
                      <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                      <option value="Gill Sans, sans-serif">Gill Sans</option>
                      <option value="Noto Sans, sans-serif">Noto Sans</option>
                      <option value="Roboto, sans-serif">Roboto</option>
                      <option value="Open Sans, sans-serif">Open Sans</option>
                      <option value="Lato, sans-serif">Lato</option>
                      <option value="Poppins, sans-serif">Poppins</option>
                      <option value="Montserrat, sans-serif">Montserrat</option>
                      <option value="Oswald, sans-serif">Oswald</option>
                      <option value="Raleway, sans-serif">Raleway</option>
                      <option value="Nunito, sans-serif">Nunito</option>
                      <option value="Mukta, sans-serif">Mukta</option>
                      <option value="Quicksand, sans-serif">Quicksand</option>
                      <option value="Ubuntu, sans-serif">Ubuntu</option>
                      <option value="Cabin, sans-serif">Cabin</option>
                      <option value="Exo 2, sans-serif">Exo 2</option>

                      {/* Serif Fonts */}
                      <option value="Georgia, serif">Georgia</option>
                      <option value="Times New Roman, serif">Times New Roman</option>
                      <option value="Palatino Linotype, serif">Palatino Linotype</option>
                      <option value="Book Antiqua, serif">Book Antiqua</option>
                      <option value="Garamond, serif">Garamond</option>
                      <option value="Baskerville, serif">Baskerville</option>
                      <option value="PT Serif, serif">PT Serif</option>
                      <option value="Merriweather, serif">Merriweather</option>
                      <option value="Playfair Display, serif">Playfair Display</option>
                      <option value="Libre Baskerville, serif">Libre Baskerville</option>

                      {/* Monospace Fonts */}
                      <option value="Courier New, monospace">Courier New</option>
                      <option value="Lucida Console, monospace">Lucida Console</option>
                      <option value="Consolas, monospace">Consolas</option>
                      <option value="Source Code Pro, monospace">Source Code Pro</option>
                      <option value="Fira Code, monospace">Fira Code</option>
                      <option value="Roboto Mono, monospace">Roboto Mono</option>
                      <option value="Ubuntu Mono, monospace">Ubuntu Mono</option>
                      <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                      <option value="Inconsolata, monospace">Inconsolata</option>
                      <option value="Overpass Mono, monospace">Overpass Mono</option>

                      {/* Cursive Fonts */}
                      <option value="Dancing Script, cursive">Dancing Script</option>
                      <option value="Pacifico, cursive">Pacifico</option>
                      <option value="Great Vibes, cursive">Great Vibes</option>
                      <option value="Satisfy, cursive">Satisfy</option>
                      <option value="Caveat, cursive">Caveat</option>
                      <option value="Shadows Into Light, cursive">Shadows Into Light</option>
                      <option value="Amatic SC, cursive">Amatic SC</option>
                      <option value="Courgette, cursive">Courgette</option>
                      <option value="Sacramento, cursive">Sacramento</option>
                      <option value="Handlee, cursive">Handlee</option>
                    </select>
                  </div>
                  </div>
                  
                </div>
              </div>
              <div className="px-4 py-2 rounded-b-lg dark:bg-gray-800" style={myStyle}>
                <textarea
                  id="editor"
                  rows="10"
                  value={text}
                  onChange={handleChange}
                  className="id1 rounded block w-full px-0 text-sm border-0 dark:bg-gray-800 focus:ring-0 dark:text-gray-800 dark:placeholder-gray-400"
                  style={{
                    ...myStyle,
                    fontFamily: font
                  }}
                  placeholder="Write text..."
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className='container mx-auto mt-6 mb-13 id1 rounded' style={myStyle}>
          <h6 className="text-4xl font-extrabold italic leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">preview</h6>
          <div
            className="preview-area"
            style={{ ...myStyle, padding: '1rem', minHeight: '100px' }}
            dangerouslySetInnerHTML={{ __html: renderPreviewText() }}
          />
        </div>
        <footer className=" shadow-sm mt-4 mb-6 dark:bg-gray-800" style={myStyle}>
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between" style={myStyle}>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" className="hover:underline">Ad Adarsh</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="/about" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="https://form.jotform.com/250833805536459" target='_blank' className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
        </footer>
      </main>
      <footer className=" bg-stone-700 
               text-white fixed 
                w-full bottom-0 ">
        <div className="container mx-auto">
          <p className='italic mt-1'>{text.trim().split(/\s+/).filter(Boolean).length} Words, {text.length} Characters,{cursorPosition.row} Rows,{cursorPosition.column} Column </p>
        </div>
      </footer>
    </>
  );
}

export default TextArea;