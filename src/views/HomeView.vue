<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Work Out Your Workouts! Your one stop shop to customizing and planning a workout!",
      errors: {},

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
  </div>
</template>

<style>

</style>