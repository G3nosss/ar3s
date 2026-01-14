import { Buffer } from 'buffer';
import Avrgirl from 'avrgirl-arduino';

window.Buffer = Buffer;

// 1. PASTE YOUR NEW LINK BELOW!
const API_URL = "https://0874d754f449d891-18-61-231-184.serveousercontent.com";

import './style.css';

function log(message) {
    const terminal = document.getElementById('output');
    if (terminal) {
        terminal.innerText += "\n" + message;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});

require(['vs/editor/editor.main'], function () {
    window.editor = monaco.editor.create(document.getElementById('editorContainer'), {
        value: `void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}`,
        language: 'cpp',
        theme: 'vs-dark',
        automaticLayout: true,
    });

    // --- BUTTON ACTIONS ---

    // The function that talks to AWS
    async function handleVerify() {
        if (!window.editor) return;
        
        const sketchCode = window.editor.getValue();
        const selectedBoard = document.getElementById('boardSelect').value;
        
        log("⌛ Sending to AWS Cloud for verification...");

        try {
            const response = await fetch(`${API_URL}/compile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sketch: sketchCode, board: selectedBoard })
            });

            const data = await response.json();

            if (data.success) {
                log("✅ Compilation Successful!");
                window.latestHex = data.hex; 
                document.getElementById('uploadBtn').disabled = false;
                document.getElementById('downloadHexBtn').disabled = false;
            } else {
                log("❌ Error: " + (data.error || data.output));
            }
        } catch (err) {
            log("❌ Could not reach AWS. Is your tunnel open?");
        }
    }

    // THIS IS THE BRIDGE - DO NOT DELETE
    window.handleVerify = handleVerify;

    document.getElementById('homeBtn').addEventListener('click', () => {
        document.getElementById('idePage').style.display = 'none';
        document.getElementById('landingPage').style.display = 'flex';
    });

}); // End of file