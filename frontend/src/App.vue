<template>
  <div id="app">
    <h1 class="title">
      Hey I'm AImy, the CPT Therapist!
    </h1>
  
    <p class="intro">
      {{ intro }}
    </p>
    <button
      class="btn"
      @click="toggleListening"
    >
      {{ isListening ? 'Done' : 'Start Listening' }}
    </button>
    <h2 class="subtitle">
      You said:
    </h2>
    <div class="text">
      {{ yousaid }}
    </div>
    <h2 class="subtitle">
      Response:
    </h2>
    <div class="text">
      {{ response }}
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      intro: '',
      response: '',
      yousaid:'',
      recognition: null,
      isListening: false, // new property to track listening state
    };
},
async mounted() {
    try {
    const res = await axios.post('http://127.0.0.1:5000/api/ask', {
        message: 'Who are you? Give me a brief intro',
    });
    this.intro = res.data.response;
    } catch (error) {
    console.error('Error:', error);
    }
},
methods: {
    toggleListening() {
      if (this.isListening) {
        this.stopListening();
      } else {
        this.startListening();
      }
      this.isListening = !this.isListening;
    },
    async startListening() {
    this.recognition = new window.webkitSpeechRecognition(); // Create a speech recognition instance
    this.recognition.lang = 'en-US'; // Set the language

    this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the transcribed speech
        this.yousaid = transcript;
        this.sendMessage(transcript); // Send the transcribed speech as a message
    };

    this.recognition.start(); // Start listening
    },
    stopListening() {
    if (this.recognition) {
        this.recognition.stop(); // Stop listening
    }
    },
    async sendMessage(message) {
    try {
        const res = await axios.post('http://127.0.0.1:5001/api/ask', {
        message: message,
        });
        this.response = res.data.response;
    } catch (error) {
        console.error('Error:', error);
    }
    },
},
};
</script>


<style scoped>



#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
    font-family: 'SF Pro Text', 'Helvetica Neue', 'Arial', sans-serif;
    color: #333;
}

.title {
    font-size: 2em;
    margin-bottom: 30px;
}

.intro {
    margin-bottom: 20px;
    text-align: center;
}

.buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.btn {
    border: none;
    padding: 10px 20px;
    background-color: #007AFF;
    color: white;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn[isListening='true'] {
  background-color: #FF3B30;
}
/* .btn.stop {
  background-color: #FF3B30;
} */

.btn:hover {
  opacity: 0.8;
}

.subtitle {
  font-size: 1.5em;
  margin-top: 30px;
}

.text {
  background-color: #F8F8F8;
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  word-break: break-word;
  margin-bottom: 30px;
}
</style>
  