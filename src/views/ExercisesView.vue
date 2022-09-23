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

      exercisePageAmount: 10,
      exercisesPerPage: 20,
      pageNumber: 0,
      exercisesOnPage: {}
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
        // if (this.exercises.length / this.exercisesPerPage % 1 > 0) {
        //   this.exercisePageAmount = (this.exercises.length / this.exercisesPerPage + 1) - (this.exercises.length / this.exercisesPerPage % 1)
        // }
        // else {
        //   this.exercisePageAmount = this.exercises.length / this.exercisesPerPage
        // }
        console.log(this.exercisePageAmount)
        console.log(localStorage.jwt)
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
    },
    setPageNumber: function (page) {
      this.pageNumber = page - 1
      console.log(this.pageNumber)
      window.scrollTo(0, 0);
    },
    setPrevPageNumber: function (page) {
      this.pageNumber = this.pageNumber - 1
      console.log(this.pageNumber)
      window.scrollTo(0, 0);
    },
    setNextPageNumber: function (page) {
      console.log(page)
      this.pageNumber = this.pageNumber + 1
      window.scrollTo(0, 0);
      // console.log(this.pageNumber)
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- {{exercises}} -->
    <p v-for="(exercise, index) in exercises">
      <!-- <div v-if <img v-bind:src="exercise.gifUrl" /> -->
    <div v-if="index >= pageNumber*20 && index <= (pageNumber+1)*20">

      <img v-bind:src="exercise.gifUrl" />
      {{exercise.id}}
      {{exercise.name}}
      <br />
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



  <div>Here is where I test new stuff</div>

  <nav aria-label="...">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled" v-if="pageNumber + 1== 1">
        <a class="page-link" href="#">Previous</a>
      </li>
      <li class="page-item" v-if="pageNumber + 1!= 1">
        <a class="page-link" @click="setPrevPageNumber()">Previous</a>
      </li>
      <li class="page-item" v-for="page in exercisePageAmount" :key="page">
        <a class="page-link" @click="setPageNumber(page)" v-if="page != pageNumber + 1">{{page}}</a>
        <a class="page-link active" @click="setPageNumber(page)" v-if="page == pageNumber + 1">{{page}}</a>
      </li>
      <li class="page-item" v-if="pageNumber + 1== exercisePageAmount">
        <a class="page-link disabled" @click="setNextPageNumber(page)">Next</a>
      </li>
      <li class="page-item" v-if="pageNumber + 1!= exercisePageAmount">
        <a class="page-link" @click="setNextPageNumber(page)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style>

</style>