<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Exercise List!",
      exercises: {}
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
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    {{exercises}}
    <p v-for="exercise in exercises">
      {{exercise.name}}
      {{exercise.id}}
    </p>
  </div>
</template>

<style>

</style>