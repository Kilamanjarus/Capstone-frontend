<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      workoutExercises: {},
      workoutExercise: {},
    };
  },
  created: function () {
    this.workoutExerciseIndex();
  },
  methods: {
    workoutExerciseIndex: function () {
      console.log("Pulling all Exercises added to workouts...")
      axios.get("http://localhost:3000/workouts").then(response => {
        console.log(response.data)
        this.workoutExercises = response.data
      })
    },
    workoutExerciseCreate: function () {
      console.log("Adding Exercise to Workout...")
      axios.post("http://localhost:3000/workouts", this.workoutExercise).then(response => {
        console.log(response.data)
      })
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      <p><b>Exercise ID: </b><input type="text" v-model="workoutExercise.exercise_id"></p>
      <p><b>Weights: </b><input type="text" v-model="workoutExercise.added_weight"></p>
      <p><b>Reps: </b><input type="text" v-model="workoutExercise.reps"></p>
      <p><b>Sets: </b><input type="text" v-model="workoutExercise.sets"></p>
      <p><b>Exercise ID: </b><button @click="workoutExerciseCreate">Add to Routine!</button></p>
    </div>
    <div>
      <p v-for="currentExercise in workoutExercises">
        {{ currentExercise }}
      </p>
    </div>
  </div>
</template>

<style>
</style>