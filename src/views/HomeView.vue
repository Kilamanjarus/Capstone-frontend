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
    };
  },
  created: function () {
    this.routineIndex();
  },
  methods: {
    routineIndex: function () {
      console.log("Pulling all Exercises added to workouts...")
      axios.get("http://localhost:3000/routines.json").then(response => {
        console.log(response.data)
        this.routines = response.data
      })
    },
    routineCreate: function () {
      console.log("Adding Exercise to Workout...")
      axios.post("http://localhost:3000/routines.json", this.newRoutine).then(response => {
        console.log(response.data)
        this.routines.push(response.data)
        this.newRoutine = {}
      })
    },
    routineUpdate: function (currentExercise) {
      console.log('Updating Exercise...')
      console.log(currentExercise)
      axios.patch(`http://localhost:3000/routines/${currentExercise.id}.json`, currentExercise).then(response => {
        console.log(response.data)
      })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors)
        });
    },
    routineDelete: function (currentExercise) {
      axios.delete(`http://localhost:3000/routines/${currentExercise.id}).json`).then(response => {
        console.log(`Deleting exercise from routine...`)
        console.log(response.data)
        // this.$router.push("/routine") multi page this will work...
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h1><a href="/login">Login!</a> | <a href="/signup">Signup!</a></h1>
  </div>
</template>

<style>

</style>