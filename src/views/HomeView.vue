<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Work Out Your Workouts! Your one stop shop to customizing and planning a workout!",
      errors: {},

      creditMessage: "Exercise database, including equipment data, is all created by Justin Mozley and received through https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/",

      routines: {},
      newRoutine: {},

      workouts: {},
      newWorkout: {},
      selectedWorkout: {},

      storageJwt: false,
    };
  },
  created: function () {
    this.localStorageCheck();
  },
  methods: {
    localStorageCheck: function () {
      return !!localStorage.jwt
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1 v-if="!localStorageCheck()"><a href="/login">Login!</a> | <a href="/signup">Signup!</a></h1>
    <h1 v-if="localStorageCheck()"><a href="/logout">Logout!</a></h1>
    <h5>{{this.creditMessage}}</h5>
  </div>
</template>

<style>

</style>