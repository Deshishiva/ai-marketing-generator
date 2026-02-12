# AI Marketing Generator

An AI-powered full-stack web application that generates professional marketing content including Instagram captions, trending hashtags, and premium brand taglines based on user input.

---

## 🛠 Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Custom CSS Animations

### Backend
- Node.js
- Express.js
- CORS
- Dotenv

### AI Integration
- Ollama (Local LLM)
- Model: gemma3:1b / phi3:mini

---

## ⚙️ Installation Process (Local Setup)


#  Install Backend

cd backend  
npm install  
node server.js  

Backend runs at:  
http://localhost:3001

---

# Install Frontend

cd ../frontend  
npm install  
npm run dev  

Frontend runs at:  
http://localhost:3000

---

# Install AI Model (Ollama)

Install Ollama from:  
https://ollama.com

Pull model:

ollama pull gemma3:1b  

OR  

ollama pull phi3:mini  

---

# 📂 Project Structure

ai-marketing-generator/  
│  
├── backend/  
│   ├── server.js  
│   ├── package.json  
│  
├── frontend/  
│   ├── app/  
│   │   ├── page.tsx  
│   │   ├── layout.tsx  
│   ├── package.json  
│  
└── README.md  

---

##  Result

The application generates structured marketing content in the following format:

---INSTAGRAM CAPTION---  
(Engaging marketing caption)

---HASHTAGS---  
#tag1 #tag2 #tag3 #tag4 #tag5  

---TAGLINE---  
(Short premium brand tagline)

Users provide:
- Product Name
- Target Audience
- Tone

The system returns creative, formatted marketing output powered by AI.

---



Shiva Kumar Deshi

