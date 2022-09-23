<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Workouts!",
      workouts: {},
      newWorkout: {},
      selectedWorkout: {},
    };
  },
  created: function () {
    this.workoutsIndex();
  },
  methods: {
    workoutsIndex: function () {
      console.log(`Getting workouts...`)
      axios.get(`http://localhost:3000/workouts.json`).then(response => {
        console.log(response.data)
        this.workouts = response.data
      })
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <p><b>All Workouts!</b></p>

  <p v-for="workout in workouts">
  <div>
    <a v-bind:href="`/workouts/${workout.id}`"> {{ workout.title }}</a>
  </div>
  <br />
  <!-- {{workout}} -->
  {{workout.routines}}
  <div v-for="exercise in workout.exercises">
    {{ exercise.name }}
  </div>
  <p></p>
  </p>
</template>

<style>

</style>