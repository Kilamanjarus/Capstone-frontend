<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      workoutExercises: {},
      workoutExercise: {},
      errors: {},
      workouts: {},
      newWorkout: {}
    };
  },
  created: function () {
    this.workoutExerciseIndex();
    this.workoutsIndex();
  },
  methods: {
    workoutExerciseIndex: function () {
      console.log("Pulling all Exercises added to workouts...")
      axios.get("http://localhost:3000/routines").then(response => {
        console.log(response.data)
        this.workoutExercises = response.data
      })
    },
    workoutExerciseCreate: function () {
      console.log("Adding Exercise to Workout...")
      axios.post("http://localhost:3000/routines", this.workoutExercise).then(response => {
        console.log(response.data)
        this.workoutExercises.push(response.data)
      })
    },
    workoutExerciseUpdate: function (currentExercise) {
      console.log('Updating Exercise...')
      console.log(currentExercise)
      axios.patch(`http://localhost:3000/routines/${currentExercise.id}`, currentExercise).then(response => {
        console.log(response.data)
      })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors)
        });
    },
    workoutsIndex: function () {
      console.log(`Getting workouts...`)
      axios.get(`http://localhost:3000/workouts`).then(response => {
        console.log(response.data)
        this.workouts = response.data
      })
    },
    workoutsCreate: function () {
      console.log(`Creating new workout...`)
      axios.post(`http://localhost:3000/workouts`, this.newWorkout).then(response => {
        console.log(response.data)
        this.workouts.push(response.data)
      })
    }
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
    <p><b>Current Workout:</b></p>
    <b>Title: </b>
    <input type="text" v-model="newWorkout.title">
    <button @click="workoutsCreate">Create Workout!</button>
    <div>
      <div v-for="currentExercise in workoutExercises">
        <div v-if="currentExercise.status === `added`">
          {{ currentExercise.id }}
          <p>Exercise ID: <input type="text" v-model="currentExercise.exercise_id"></p>
          <p>Weight: <input type="text" v-model="currentExercise.added_weight"></p>
          <p>Sets: <input type="text" v-model="currentExercise.sets"></p>
          <p>Reps: <input type="text" v-model="currentExercise.reps"></p>
          <button @click="workoutExerciseUpdate(currentExercise)">Update Exorcise</button>
          <br>
        </div>
      </div>
    </div>
  </div>
  <div>
    <p><b>All Workouts!</b></p>
    <p v-for="workout in workouts">
    <div>{{ workout.title }}</div>
    </p>
  </div>
</template>

<style>
</style>