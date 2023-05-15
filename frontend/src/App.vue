<template>
  <div id="app">
    <img
      class="profile"
      src="./assets/images/aimy.png"
    >
    <h1 class="title">
      Hey I'm AImy, the CPT Therapist 😊
    </h1>
      
    <p class="intro">
      It's great to meet you! I am a therapy chatbot trained in Cognitive Behavioral Therapy (CBT).<br>
      Go ahead and hit the blue button to start a conversation with me!
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
    //   intro: '',
      response: '',
      yousaid:'',
      recognition: null,
      isListening: false, // new property to track listening state
    };
},
async mounted() {
    // try {
    // const res = await axios.post('http://127.0.0.1:5000/api/ask', {
    //     message: 'Who are you? Give me a brief intro',
    // });
    // this.intro = res.data.response;
    // console.log("intro: "+ this.intro)
    // } catch (error) {
    // console.error('Error:', error);
    // }
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


<style>

#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-top: 20px;
    padding-right: 50px;
    font-family: 'SF Pro Text', 'Helvetica Neue', 'Arial', sans-serif;
    color: white;
}

.title {
    font-size: 2em;
    margin-bottom: 30px;
}

.intro {
    margin-bottom: 20px;
    margin-left: 100px;
    margin-right: 100px;
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
    background-color: #85A8EC;
    color: white;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn[isListening='true'] {
  background-color: #85A8EC;
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
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  word-break: break-word;
  margin-bottom: 30px;
}
.profile {
    max-width: 40%;
}
body {
  background-image: url("~@/assets/images/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
  