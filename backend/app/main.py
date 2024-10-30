# backend/app/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

# Load OpenAI API key from environment variable
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

@app.post("/api/answer")
async def get_answer(question: Question):
    try:
        response = client.chat.completions.create(
            model="ft:gpt-4o-mini-2024-07-18:van-heurck::ANzl11Kn",
            messages=[
            {
                "role": "system",
                "content": "Provide thorough, step-by-step explanations to complex questions about advanced mathematics, suitable for a student learning the topic.",
            },
            {
                "role": "user",
                "content": question.question,
            }
            ],
            max_tokens=1000,
            temperature=0.5
        )

        answer = response.choices[0].message.content
        return {"answer": answer}
    except Exception as e:
        return {"answer": f"An error occurred: {str(e)}"}
