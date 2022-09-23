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
  <div>Here is where I test new stuff</div>








  <nav aria-label="...">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item active">
        <span class="page-link">
          2
          <span class="sr-only"></span>
        </span>
      </li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style>

</style>