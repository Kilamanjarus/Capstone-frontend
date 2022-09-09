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
    workoutsCreate: function () {
      console.log(`Creating new workout...`)
      axios.post(`http://localhost:3000/workouts.json`, this.newWorkout).then(response => {
        console.log(response.data)
        this.workouts.push(response.data)
      })
    },
    workoutsShow: function (selectedWorkout) {
      console.log(`Showing selected workout....`)
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
    {{ workout.title }}
  <div><button @click="workoutsShow(selectedWorkout)">Show more</button></div>
  <br />
  <div v-for="exercise in workout.exercises">
    {{ exercise.name }}
  </div>
  <p></p>
  </p>
</template>

<style>

</style>