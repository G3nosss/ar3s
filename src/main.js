import Avrgirl from 'avrgirl-arduino';

const API_URL = "http://18.61.231.184:3000"; // Hyderabad Server

import './style.css';

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});

require(['vs/editor/editor.main'], function () {
    window.editor = monaco.editor.create(document.getElementById('editorContainer'), {
        value: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
        language: 'cpp',
        theme: 'vs-dark',
        automaticLayout: true
    });
});

const log = (msg) => {
  const c = document.getElementById('consoleOutput');
  if(c) { c.innerText += '\n' + msg; c.scrollTop = c.scrollHeight; }
};

// --- BUTTON LOGIC ---

// 1. HOME BUTTON
document.getElementById('homeBtn').addEventListener('click', () => {
    document.getElementById('idePage').style.display = 'none';
    document.getElementById('landingPage').style.display = 'flex';
});

// 2. VERIFY (Compile)
document.getElementById('verifyBtn').addEventListener('click', async () => {
    if (!window.editor) return;
    
    // Get the Code & Board info
    const sketchCode = window.editor.getValue();
    const selectedBoard = document.getElementById('boardSelect').value;
    
    log("⏳ Sending to AWS Cloud...");

    try {
        // Send to Hyderabad Server
        const response = await fetch(`${AWS_IP}/compile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sketch: sketchCode, 
                board: selectedBoard 
            })
        });

        const data = await response.json();

        // Handle the Result
        if (data.success) {
            log("✅ Compilation Successful!");
            log("ℹ️ Server returned a fresh .HEX file.");
            
            // Enable Download/Upload buttons
            document.getElementById('uploadBtn').disabled = false;
            document.getElementById('downloadHexBtn').disabled = false;
            
            // Save the hex data
            window.latestHex = data.hex; 
        } else {
            log("❌ Error: " + data.output);
        }

    } catch (err) {
        log("❌ Connection Failed! Is the AWS server running?");
        console.error(err);
    }
});

// 3. DOWNLOAD HEX (New Feature)
document.getElementById('downloadHexBtn').addEventListener('click', () => {
    log("💾 Downloading .hex file...");
    
    // Mock Hex Data (This is just dummy data for simulation)
    const mockHex = ":100000000C945C000C946E000C946E000C946E0061"; 
    
    // Create a Blob (File) from the text
    const blob = new Blob([mockHex], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a hidden link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = "firmware.hex"; // The file name
    a.click();
    
    window.URL.revokeObjectURL(url);
    log("✅ Download Complete!");
});

// 4. UPLOAD (Flash)
document.getElementById('uploadBtn').addEventListener('click', () => {
    if (!window.latestHex) {
        alert("❌ No compiled code found. Please verify/compile first!");
        return;
    }

    const logArea = document.getElementById('output');
    logArea.textContent += "\n🔌 Searching for Mark 4 Board...";

    const avrgirl = new Avrgirl({
        board: 'uno', 
        debug: true
    });

    // The hex data is saved in window.latestHex by the compile step
    const hexData = atob(window.latestHex);

    avrgirl.flash(hexData, (error) => {
        if (error) {
            logArea.textContent += "\n❌ Error: " + error;
        } else {
            logArea.textContent += "\n✅ Upload Successful! Board is resetting...";
        }
    });    
    log("⚠️ Waiting for board connection...");
});