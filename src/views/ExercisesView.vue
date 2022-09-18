<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Exercise List!",
      exercises: {},
      added: false,
      currentExercise: {},
      newRoutine: {},
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
    openOptions: function (exercise) {
      console.log(`Opening up options to add a routine...`)
      console.log(exercise)
      this.newRoutine = {}
      this.currentExercise = exercise
      document.querySelector('#routine-details').showModal();
    },
    routineCreate: function (exercise) {
      console.log(`Creating new routine....`)
      console.log(exercise)
      this.newRoutine.exercise_id = exercise.id
      if (exercise.equipment == "body weight" || exercise.equipment == "assisted") {
        this.newRoutine.added_weight = 0
      }
      console.log(this.newRoutine)
      axios.post("http://localhost:3000/routines.json", this.newRoutine).then(response => {
        console.log(response.data)
        this.routines.push(response.data)
        this.newRoutine = {}
      })
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
      {{exercise.id}}
      {{exercise.name}}
      <button @click="openOptions(exercise)">Add to Workout...</button>
    </div>
    </p>
  </div>

  <dialog id="routine-details">
    <form method="dialog">
      <h1>Exercise info</h1>
      <p><b>Exercise Name:</b> {{ currentExercise.name }}</p>
      <p><b>Exercise Target:</b> {{ currentExercise.target }}</p>
      <p><b>Exercise Muscle Grouping:</b> {{ currentExercise.bodyPart }}</p>
      <p><b>Exercise Equipment:</b> {{ currentExercise.equipment }}</p>
      <p>To create a Routine for your Workout, please enter the information needed below...</p>
      <p><b>Sets: </b><input type="text" v-model="newRoutine.sets"></p>
      <p><b>Reps: </b><input type="text" v-model="newRoutine.reps"></p>
      <p v-if="currentExercise.equipment==`body weight` || currentExercise.equipment==`assisted`">
      </p>
      <p v-else>
        <b>Added Weight: </b><input type="text" v-model="newRoutine.added_weight">
      </p>
      <button @click="routineCreate(currentExercise)">Create Routine...</button>
      <button>Close</button>
    </form>
  </dialog>
</template>

<style>

</style>