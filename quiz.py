import streamlit as st
from dotenv import load_dotenv
import os
import google.generativeai as genai
import random

load_dotenv()  # load all the environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# prompt = """
# You are a quiz generator. You will be taking the provided text
# and creating a multiple-choice question based on it. Please provide the text:
# """

prompt="""You're an experienced quiz creator who specializes in generating multiple-choice quizzes based on given text, ensuring that the questions are relevant and engaging. Your task is to generate a quiz with multiple options based on a given text. The user will provide the text, and you need to formulate questions without including the correct answer as an option. Remember to create questions that test comprehension, critical thinking, and knowledge retention. Your aim is to challenge the quiz taker and provide a meaningful assessment of their understanding of the text"""


def generate_quiz_from_text(text):
    # Split text into sentences
    sentences = text.split('. ')
    
    # Check if there are enough sentences to sample
    if len(sentences) < 4:
        st.warning("The text is too short to generate a quiz.")
        st.stop()

    # Randomly select a sentence for the question
    question = random.choice(sentences)
    
    # Randomly select 3 other sentences for the options
    options = random.sample(sentences, 3)
    
    # Ensure the correct answer is in the options
    if question not in options:
        options.pop()
        options.append(question)
    
    # Shuffle the options
    random.shuffle(options)
    
    return question, options

# Text input
text_input = st.text_area("Enter the text from which you want to generate a quiz:")

# Generate Quiz button
if st.button("Generate Quiz"):
    question, options = generate_quiz_from_text(text_input)
    
    st.write("Question:")
    st.write(question)
    
    st.write("Options:")
    for i, option in enumerate(options, start=1):
        st.write(f"{i}. {option}")
