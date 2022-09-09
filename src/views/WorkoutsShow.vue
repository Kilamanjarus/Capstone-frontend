<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      workout: {},
      routines: {}
    };
  },
  created: function () {
    this.workoutsShow();
  },
  methods: {
    workoutsShow: function (selectedWorkout) {
      console.log(`Showing selected workout....`)
      axios.get(`http://localhost:3000/workouts/${this.$route.params.id}.json`).then(response => {
        console.log(response.data)
        this.workout = response.data
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <p><b>Title: </b>{{workout.title}}</p>
  <!-- <p><b>Routines: </b>{{workout.routines}}</p> -->
  <div v-for="routine in workout.routines">
    <b> --- </b>
    <p><b>Exercise Name: </b>{{routine.exercise.name}}</p>
    <p><b>Exercise Style: </b>{{routine.exercise.style}}</p>
    <p><b>Exercise Muscle: </b>{{routine.exercise.muscle}}</p>
    <p><b>Weight: </b>{{routine.added_weight}} lbs</p>
    <p><b>{{routine.sets}} Sets by {{routine.reps}} Reps!</b></p>
  </div>
  <br />
</template>

<style>

</style>