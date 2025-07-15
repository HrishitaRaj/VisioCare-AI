# VisioCareAI 🎨🩺

**VisioCareAI** is an AI-powered multimodal health analysis platform that analyzes **Text**, **Images**, and **Audio** to detect health-related conditions, emotions, and contextual cues. 
It combines the capabilities of modern transformer-based models with a sleek frontend for accessible, intelligent diagnostic assistance.

---

## 📸 Screenshots

<img width="1916" height="898" alt="image" src="https://github.com/user-attachments/assets/f494f315-f1a5-4f61-97d3-7835365ca0ef" />

<img width="1892" height="893" alt="image" src="https://github.com/user-attachments/assets/680d2a65-88b7-4bd3-aaf6-031797eef3db" />

<img width="1503" height="896" alt="image" src="https://github.com/user-attachments/assets/42b66335-a8f5-429e-80c3-38363be154a3" />

<img width="1635" height="895" alt="image" src="https://github.com/user-attachments/assets/5be633a8-7033-422c-a144-5571c19e3ce0" />

---

## ✨ Features

- 📄 **Text Analysis:** Detects sentiment and emotion from written input.
- 🖼️ **Image Analysis:** Classifies images based on health-related visual indicators.
- 🎙️ **Audio Analysis:** Analyzes speech/audio clips for emotion or health context.
- ⚡ Smooth, animated **React + Tailwind CSS** frontend.
- 🔗 **FastAPI backend** with Hugging Face Transformers.
- 🌸 Clean, modern UI with animated interactions and particle effects.

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, Hugging Face Transformers, Pillow
- **Frontend:** React.js, Tailwind CSS, Framer Motion, React Icons
- **ML Models:** Pre-trained models from Hugging Face (DistilBERT, ViT, HuBERT)

---

## ⚙️ Setup Instructions

### Backend

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```
cd frontend
npm install
npm run dev
```

## 📖 Upcoming Improvements

- 🎨 **Deploy real fine-tuned multimodal models** for accurate health diagnostics.
- 🌐 **Host a live demo** on Hugging Face Spaces or Render.
- 📈 **Add logging, error handling, and file management enhancements** for robustness.
- 💾 **Integrate a database** for storing historical analysis records and reports.
