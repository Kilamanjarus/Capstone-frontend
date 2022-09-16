<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Exercise List!",
      exercises: {},
      added: false,
    };
  },
  created: function () {
    this.exercisesIndex();
  },
  methods: {
    exercisesIndex: function () {
      console.log(`Retrieving exercises...`)
      axios.get("http://localhost:3000/exercises.json").then(response => {
        console.log(response.data)
        this.exercises = response.data
      })
    },
    openOptions: function () {
      console.log(`Opening up options to add a routine...`)

    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- {{exercises}} -->
    <p v-for="exercise in exercises">
      <!-- <div v-if <img v-bind:src="exercise.gifUrl" /> -->
      <img v-bind:src="exercise.gifUrl" />
    <div>
      <b>{{exercise.id}}</b>
      {{exercise.name}}
      <button @click="openOptions();">More info...</button>
    </div>
    </p>
  </div>
</template>

<style>

</style>