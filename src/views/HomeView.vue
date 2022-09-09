<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      errors: {},

      routines: {},
      newRoutine: {},

      workouts: {},
      newWorkout: {},
      selectedWorkout: {},

      exercises: {}
    };
  },
  created: function () {
    this.routineIndex();
    this.workoutsIndex();
    this.exercisesIndex();
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
    },
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
    <h2>Exercises:</h2>
    {{exercises}}
    <p v-for="exercise in exercises">
      {{exercise.name}}
      {{exercise.id}}
    </p>
    <div>
      <p><b>Exercise ID: </b><input type="text" v-model="newRoutine.exercise_id"></p>
      <p><b>Weights: </b><input type="text" v-model="newRoutine.added_weight"></p>
      <p><b>Reps: </b><input type="text" v-model="newRoutine.reps"></p>
      <p><b>Sets: </b><input type="text" v-model="newRoutine.sets"></p>
      <p><b>Exercise ID: </b><button @click="routineCreate">Add to Routine!</button></p>
    </div>
    <p><b>Current Workout:</b></p>
    <b>Title: </b>
    <input type="text" v-model="newWorkout.title">
    <button @click="workoutsCreate">Create Workout!</button>
    <p><b>Current Routine Exercises:</b></p>
    <div>
      <div v-for="currentExercise in routines">
        <div v-if="currentExercise.status === `added`">
          {{ currentExercise.id }}
          <button @click="routineDelete(currentExercise)">Delete Exercise</button>
          <p>Exercise ID: <input type="text" v-model="currentExercise.exercise_id"></p>
          <p>Weight: <input type="text" v-model="currentExercise.added_weight"></p>
          <p>Sets: <input type="text" v-model="currentExercise.sets"></p>
          <p>Reps: <input type="text" v-model="currentExercise.reps"></p>
          <button @click="routineUpdate(currentExercise)">Update Exorcise</button>
          <p>
            <br />
          </p>
        </div>
      </div>
    </div>
  </div>
  <div>
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
    <p>******************************************************************************</p>
  </div>
</template>

<style>

</style>