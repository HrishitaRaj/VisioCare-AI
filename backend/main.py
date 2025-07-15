from fastapi import FastAPI, File, UploadFile 
from pydantic import BaseModel
from typing import List, Union
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi import File, UploadFile
from PIL import Image
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import shutil
import io
import os

# Load env variables
load_dotenv()

app = FastAPI()

tags_metadata = [
    {
        "name": "Text Analysis",
        "description": "Endpoints for analyzing text data and returning classification results.",
    },
    {
        "name": "Image Classification",
        "description": "Endpoints for classifying images using a vision transformer model.",
    },
    {
        "name": "Audio Classification",
        "description": "Endpoints for analyzing audio files and classifying emotions.",
    },
]

app.openapi_tags = tags_metadata

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Hugging Face model pipeline
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

image_classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

audio_classifier = pipeline("audio-classification", model="superb/hubert-large-superb-er")

# Data model for input
class TextData(BaseModel):
    text: str

# Response models
class TextResponse(BaseModel):
    label: str
    score: float

class ImageResponse(BaseModel):
    label: str
    score: float

class AudioResponse(BaseModel):
    label: str
    score: float

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"error": "Validation error", "details": exc.errors()}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "details": str(exc)}
    )

@app.get("/")
def read_root():
    return {"message": "VisioCareAI backend is live!"}

@app.post("/analyze-text", response_model=List[TextResponse], tags=["Text Analysis"], summary="Analyze text and classify sentiment")
def analyze_text(data: TextData):
    result = classifier(data.text)
    return [{"label": r["label"], "score": r["score"]} for r in result]

@app.post("/analyze-image", response_model=List[ImageResponse], tags=["Image Classification"], summary="Classify objects in an uploaded image")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    result = image_classifier(image)
    return [{"label": r["label"], "score": r["score"]} for r in result] 

@app.post("/analyze-audio", response_model=List[AudioResponse], tags=["Audio Classification"], summary="Classify emotion or context from an audio clip")
async def analyze_audio(file: UploadFile = File(...)):
    with open(f"temp_audio.wav", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = audio_classifier("temp_audio.wav")
    return [{"label": r["label"], "score": r["score"]} for r in result]
