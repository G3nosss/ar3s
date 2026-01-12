import { Buffer } from 'buffer';
import Avrgirl from 'avrgirl-arduino';

window.Buffer = Buffer;

// 1. UPDATE THIS URL with your current Serveo link!
const API_URL = "https://34bc770a8e7288e3-18-61-231-184.serveousercontent.com"; 

import './style.css';

// --- UTILITY FUNCTIONS ---
function log(message) {
    const terminal = document.getElementById('terminal-output');
    if (terminal) {
        terminal.innerText += "\n" + message;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// --- MONACO EDITOR SETUP ---
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});

require(['vs/editor/editor.main'], function () {
    window.editor = monaco.editor.create(document.getElementById('editorContainer'), {
        value: `void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}`,
        language: 'cpp',
        theme: 'vs-dark',
        automaticLayout: true,
    });

    // --- BUTTON LOGIC (Inside the Require Block) ---

    // 1. HOME BUTTON
    document.getElementById('homeBtn').addEventListener('click', () => {
        document.getElementById('idePage').style.display = 'none';
        document.getElementById('landingPage').style.display = 'flex';
    });

    // 2. VERIFY / COMPILE FUNCTION
    async function handleVerify() {
        if (!window.editor) return;
        
        const sketchCode = window.editor.getValue();
        const selectedBoard = document.getElementById('boardSelect').value;
        
        log("⌛ Sending to AWS Cloud for verification...");

        try {
            const response = await fetch(`${API_URL}/compile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    sketch: sketchCode, 
                    board: selectedBoard 
                })
            });

            const data = await response.json();

            if (data.success) {
                log("✅ Compilation Successful!");
                log(data.output || "Server returned a fresh .HEX file.");
                
                document.getElementById('uploadBtn').disabled = false;
                document.getElementById('downloadHexBtn').disabled = false;
                window.latestHex = data.hex; 
            } else {
                log("❌ Compilation Failed!");
                log(data.error || data.output);
            }
        } catch (err) {
            log("❌ Connection Failed! Check if your AWS tunnel is open.");
            console.error(err);
        }
    }

    // MAKE FUNCTION GLOBAL (The Bridge)
    window.handleVerify = handleVerify;
    document.getElementById('verifyBtn').addEventListener('click', handleVerify);

    // 3. DOWNLOAD HEX
    document.getElementById('downloadHexBtn').addEventListener('click', () => {
        if (!window.latestHex) return;
        log("💾 Downloading .hex file...");
        const blob = new Blob([atob(window.latestHex)], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "firmware.hex";
        a.click();
        log("✅ Download Complete!");
    });

    // 4. UPLOAD (Flash)
    document.getElementById('uploadBtn').addEventListener('click', () => {
        if (!window.latestHex) {
            alert("❌ No compiled code found. Please verify/compile first!");
            return;
        }

        log("🔌 Searching for Board...");
        const avrgirl = new Avrgirl({ board: 'uno', debug: true });
        const hexData = atob(window.latestHex);

        avrgirl.flash(hexData, (error) => {
            if (error) {
                log("❌ Upload Error: " + error);
            } else {
                log("✅ Upload Successful! Board is resetting...");
            }
        });    
    });

}); // End of require block