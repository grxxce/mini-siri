<template>
    <div id="app">
      <h1>Hey I'm AImy, the CPT Therapist!</h1>
  
      <p>{{intro}}</p>
      <button @click="startListening">Start Listening</button>
      <button @click="stopListening">Stop Listening</button>
      <h2>Response:</h2>
      <div>{{response}}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        intro: '',
        response: '',
        recognition: null,
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
      async startListening() {
        this.recognition = new window.webkitSpeechRecognition(); // Create a speech recognition instance
        this.recognition.lang = 'en-US'; // Set the language
  
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript; // Get the transcribed speech
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
          const res = await axios.post('http://127.0.0.1:5000/api/ask', {
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
  