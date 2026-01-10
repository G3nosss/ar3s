import './style.css'; 
// NOTE: We do NOT import avrgirl here anymore because we loaded it in HTML!

const log = (msg) => {
  const c = document.getElementById('consoleOutput');
  if(c) { c.innerText += '\n' + msg; c.scrollTop = c.scrollHeight; }
};

let firmware = null;
const fileInput = document.getElementById('fileInput');

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      firmware = e.target.files[0];
      if(firmware) {
        document.getElementById('fileName').innerText = "✅ " + firmware.name;
        document.getElementById('flashBtn').disabled = false;
      }
    });
}

const flashBtn = document.getElementById('flashBtn');
if (flashBtn) {
    flashBtn.addEventListener('click', () => {
      log("🚀 Initializing connection...");
      
      const boardType = document.getElementById('boardSelect').value;
      
      // We use 'window.Avrgirl' because it comes from the internet script
      const avrgirl = new window.Avrgirl({
        board: boardType, 
        debug: true
      });

      avrgirl.flash(firmware, (err) => {
        if (err) {
          log("❌ Error: " + err);
        } else {
          log("✅ SUCCESS! Board Flashed.");
        }
      });
    });
}