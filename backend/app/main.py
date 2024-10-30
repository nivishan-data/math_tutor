# backend/app/main.py

"""
This module implements a FastAPI backend service for an advanced mathematics tutoring application.
It uses OpenAI's fine-tuned GPT model to provide detailed mathematical explanations.
"""

from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client with API key from environment variables
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# Initialize FastAPI application
app = FastAPI()

# Configure CORS middleware to allow cross-origin requests during development
# This is necessary for the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be restricted to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    """
    Pydantic model for question requests.
    
    Attributes:
        question (str): The mathematics question submitted by the user
    """
    question: str

@app.post("/api/answer")
async def get_answer(question: Question):
    """
    Endpoint to process mathematics questions and generate detailed explanations.
    
    Args:
        question (Question): Pydantic model containing the user's mathematics question
        
    Returns:
        dict: Contains either the generated answer or an error message
        
    The function uses a fine-tuned GPT model specifically trained for mathematical explanations.
    The model is configured to provide step-by-step, thorough explanations suitable for students.
    """
    try:
        # Make API call to OpenAI with the question
        response = client.chat.completions.create(
            model="ft:gpt-4o-mini-2024-07-18:van-heurck::ANzl11Kn",  # Fine-tuned model for mathematics
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
            max_tokens=1000,  # Limit response length
            temperature=0.5   # Balance between creativity and consistency
        )

        # Extract and return the generated answer
        answer = response.choices[0].message.content
        return {"answer": answer}
    except Exception as e:
        # Return any errors that occur during processing
        return {"answer": f"An error occurred: {str(e)}"}
