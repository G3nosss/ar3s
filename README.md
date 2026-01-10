# 🚀 AR3S (Cloud Flasher & IDE)

**The World's First Browser-Based Cloud Compiler for stemcorp dynamics Mark 4 & Arduino.**

Definotech AR3S is a Full-Stack IoT Platform that allows users to write, compile, and flash code to microcontrollers directly from a web browser—without installing the Arduino IDE or any drivers.

## 🌟 Features

* **☁️ Cloud Compilation:** Code is sent to a high-performance AWS Server (EC2) for instant compilation.
* **⚡ Browser Flashing:** Uses **Web Serial API** to flash `.hex` files directly to the board from Chrome/Edge.
* **🛠 Custom Board Support:** Native support for **Definotech Mark 4** alongside standard Arduino Uno, Nano, and ESP8266.
* **💻 Monaco Editor:** Intelligent code editing (same engine as VS Code) with syntax highlighting.
* **🚫 No Installations:** 100% web-based. Plug in the board, click the link, and code.

---

## 🏗️ Architecture

### **1. Frontend ( The Interface)**
* Built with **Vite** (Vanilla JS).
* **Monaco Editor** for the coding experience.
* **Avrgirl-Arduino** for flashing the chip via USB.

### **2. Backend (The Brain)**
* Hosted on **AWS EC2 (Ubuntu)**.
* Runs a **Node.js Express** server.
* Uses **Arduino CLI** to compile sketches into machine code (`.hex`).
* Managed by **PM2** for 24/7 uptime.

---

## 🚀 Getting Started (Local Development)

If you want to run this project on your own computer:

### **Prerequisites**
* Node.js installed.
* An Arduino board (Uno/Mark 4).

### **Installation**
1.  Clone the repo:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/ar3s.git](https://github.com/YOUR_USERNAME/ar3s.git)
    cd ar3s
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

---

## 🔌 Supported Boards

| Board Name | Status |
| :--- | :--- |
| **✨ stemcorp Mark 4** | ✅ Fully Supported |
| Arduino Uno R3 | ✅ Fully Supported |
| Arduino Nano | ✅ Fully Supported |
| ESP8266 (NodeMCU) | 🚧 In Progress |
| Arduino Uno R4 WiFi | 🚧 In Progress |

---

## 🛠 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript, Vite
* **Backend:** Node.js, Express, Child Process
* **Cloud:** AWS EC2 (Hyderabad Region)
* **Compiler:** Arduino CLI
* **Flashing:** Web Serial API

---

### 📝 Author
**AR3S**
& *stemcorp dynamics*
