<template>
    <div>
      <h1>Home</h1>
      <router-link :to="{ name: 'auth' }">Auth</router-link>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Home'
  }
  </script>
  