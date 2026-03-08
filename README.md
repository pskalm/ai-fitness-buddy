# 🧘‍♀️ AI Fitness Buddy — Smart Health & Nutrition Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue)](https://agent-69341f7cd2d0bb7--splendid-bubblegum-294a43.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB)](https://react.dev/)
[![AI Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)](https://ai.google/)

---

## 🧠 Project Overview

**AI Fitness Buddy** is an intelligent fitness and nutrition assistant powered by **Google Gemini 2.0**.  
It allows users to analyze food images to estimate calorie content and generate personalized diet plans based on individual goals.

This project demonstrates:
- Seamless **AI Integration**
- Effective **UX Design**
- Smart handling of **Complex Logic** within a clean and responsive UI

---

## 🚀 Features

- 🥗 **AI-Powered Nutrition Analysis** – Upload a meal image and get calorie & nutrition insights.  
- ⚡ **Personalized Diet Planning** – Create dynamic diet plans using AI prompts.  
- 🧩 **Zero Backend Infrastructure** – Fully client-side; no server cost.  
- 💅 **Modern UI/UX** – Built with React + Vite, styled with Glassmorphism.  
- 🔒 **Consistent Data Handling** – AI responses parsed strictly as JSON for reliability.

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React (Vite) |
| **AI Model** | Google Gemini 2.0 Flash |
| **Styling** | CSS (Glassmorphism) |
| **Deployment** | Netlify |
| **Language** | JavaScript (ES6+) |

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ankurrajdev/ai-fitness-buddy.git
cd ai-fitness-buddy
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Application
```bash
npm run dev
```

Open your browser and navigate to:  
👉 `http://localhost:5173`

### 4️⃣ Configure the API Key
You’ll need a **Google Gemini API Key** (free tier available).  
Enter the key in the app when prompted.

---

## 🧩 Project Structure

### 📁 `src/main.jsx`
The entry point connecting React to the DOM.  
JavaScript was used for simplicity and rapid development.

### 📁 `src/services/GeminiService.js`
Handles all AI-related operations:
- Converts uploaded images to Base64 before sending to Gemini.
- Requests structured JSON output for easier UI rendering.

### 📁 `src/components/ImageAnalyzer.jsx`
Manages image uploads, triggers AI analysis, and displays results dynamically with loading states for enhanced UX.

### 📁 `src/components/DietPlanner.jsx`
Captures user fitness goals (e.g., weight loss, muscle gain) and generates personalized diet plans using AI.  
Includes validation for non-JSON responses to maintain data integrity.

### 📁 `src/index.css`
Implements **Glassmorphism styling** for a modern, transparent, and premium interface.

---

## 🧾 Outcome

- Built a **fully serverless AI-based fitness application** with real-time image analysis and personalized meal planning.  
- Achieved **zero backend cost** while ensuring high responsiveness and performance.  
- Demonstrated integration of **AI vision + text processing** within a unified frontend system.

---

## 👨‍💻 Author

**Ankur Raj**  
AI & Full Stack Developer | Focused on building intelligent, user-centric applications  

📧 [ankurraj@example.com](mailto:ankurraj@example.com)  
🌐 [GitHub Profile](https://github.com/ankurrajdev)

---

> *“AI Fitness Buddy isn’t just a project — it’s a demonstration of how intelligent interfaces can make health and wellness accessible to everyone.”*
