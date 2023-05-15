from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import pyaudio
import wave as wv
import struct
import math

# Add your openai.api_key here
openai.api_key = "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"

app = Flask(__name__)
CORS(app)

@app.route('/api/ask', methods=['POST'])
def ask():
    message = request.json['message']

    # Add your existing code for processing the message using the openai.ChatCompletion.create() method
    chatGPT = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {'role': 'system', 'content': "Be the best CPT therapist in the world. Prompt conversation, have compassion, and be understanding. Use mentalization as a therapy tool."},
            {'role': 'user', 'content': message}]
    )
    response = chatGPT['choices'][0]['message']['content']
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
