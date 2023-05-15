<template>
    <div id="app">
      <h1>Hey I'm AImy, the CPT Therapist!</h1>
    
      <p>{{intro}}</p>
      <label for="user_input">Enter your message:</label>
      <input type="text" id="user_input" v-model="userMessage" @keyup.enter="sendMessage" required>
      <button @click="sendMessage">Send</button>
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
        userMessage: '',
        response: '',
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
      async sendMessage() {
        try {
          const res = await axios.post('http://127.0.0.1:5000/api/ask', {
            message: this.userMessage,
          });
          this.response = res.data.response;
          this.userMessage = '';
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>
  