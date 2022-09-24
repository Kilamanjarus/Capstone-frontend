<script>
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data: function () {
    return {
      message: "Exercise List!",
      exercises: [],
      added: false,
      currentExercise: {},
      newRoutine: {},

      exercisePageAmount: 10,
      exercisesPerPage: 15,
      pageNumber: 1,
      exerciseIndex: 0,
      exercisesOnPage: [],

      searchWords: "",
      muscleGroup: "",
    };
  },
  created: function () {
    this.exercisesIndex();
    this.filterExercises();
  },
  methods: {
    exercisesIndex: function () {
      console.log(`Retrieving exercises...`)
      axios.get("http://localhost:3000/exercises.json").then(response => {
        // console.log(response.data)
        this.exercises = response.data
        this.updateExercisesOnPage();
        // console.log(this.exercisePageAmount)
        // console.log(localStorage.jwt)
      })
    },
    openOptions: function (exercise) {
      console.log(`Opening up options to add a routine...`)
      // console.log(exercise)
      this.newRoutine = {}
      this.currentExercise = exercise
      document.querySelector('#routine-details').showModal();
    },
    routineCreate: function (exercise) {
      console.log(`Creating new routine....`)
      // console.log(exercise)
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
      console.log(page)
      this.pageNumber = page
      this.exerciseIndex = page - 1
      // console.log(this.pageNumber)
      this.updateExercisesOnPage(page);
      window.scrollTo(0, 0);
    },
    setPrevPageNumber: function () {
      this.pageNumber = this.pageNumber - 1
      this.exerciseIndex = this.pageNumber - 1
      // console.log(this.pageNumber)
      this.updateExercisesOnPage(this.pageNumber);
      window.scrollTo(0, 0);
    },
    setNextPageNumber: function () {
      // console.log(this.pageNumber)
      this.pageNumber = this.pageNumber + 1
      this.exerciseIndex = this.pageNumber - 1
      window.scrollTo(0, 0);
      this.updateExercisesOnPage(this.pageNumber);
      // console.log(this.pageNumber)
    },
    updateExercisesOnPage: function (page) {
      // console.log("New array is being made...")
      // console.log(page)
      this.exercisesOnPage = []
      for (let i = 0; i < this.exercisesPerPage; i++) {
        if (this.filterExercises()[i + (this.exerciseIndex * this.exercisesPerPage)]) {
          this.exercisesOnPage.push(this.filterExercises()[i + (this.exerciseIndex * this.exercisesPerPage)])
        }
      }
      // console.log(this.exercises[0])
      // console.log(this.exercisesOnPage)
      if (this.exercises.length / this.exercisesPerPage % 1 > 0) {
        this.exercisePageAmount = (this.exercises.length / this.exercisesPerPage + 1) - (this.exercises.length / this.exercisesPerPage % 1)
      }
      else {
        this.exercisePageAmount = this.exercises.length / this.exercisesPerPage
      }
      // console.log(this.exercises)
    },
    filterExercises: function () {
      // console.log('Filtering exercises...')
      return this.exercises.filter(exercise => {
        return exercise.name.includes(this.searchWords) && exercise.target.includes(this.muscleGroup)
      })
    },
    filterMuscles: function (word) {
      this.muscleGroup = word
      console.log(word)
      this.updateExercisesOnPage();
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <p>Search Here:</p>

    <span class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Muscle Group
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="filterMuscles('')">All</a>
        <a class="dropdown-item" @click="filterMuscles('adductors')">Adductors</a>
        <a class="dropdown-item" @click="filterMuscles('abductors')">Adductors</a>
        <a class="dropdown-item" @click="filterMuscles('abs')">Abs</a>
        <a class="dropdown-item" @click="filterMuscles('biceps')">Biceps</a>
        <a class="dropdown-item" @click="filterMuscles('calves')">Calves</a>
        <a class="dropdown-item" @click="filterMuscles('cardiovascular system')">Cardio</a>
        <a class="dropdown-item" @click="filterMuscles('delts')">Delts</a>
        <a class="dropdown-item" @click="filterMuscles('forearms')">Forearms</a>
        <a class="dropdown-item" @click="filterMuscles('glutes')">Glutes</a>
        <a class="dropdown-item" @click="filterMuscles('hamstrings')">Hamstrings</a>
        <a class="dropdown-item" @click="filterMuscles('levator scapulae')">Levator Scapulae</a>
        <a class="dropdown-item" @click="filterMuscles('pectorals')">Pectorals</a>
        <a class="dropdown-item" @click="filterMuscles('quads')">Quads</a>
        <a class="dropdown-item" @click="filterMuscles('serratus anterior')">Serratus Anterior</a>
        <a class="dropdown-item" @click="filterMuscles('spine')">Spine</a>
        <a class="dropdown-item" @click="filterMuscles('lats')">Lats</a>
        <a class="dropdown-item" @click="filterMuscles('traps')">Traps</a>
        <a class="dropdown-item" @click="filterMuscles('triceps')">Triceps</a>
        <a class="dropdown-item" @click="filterMuscles('upper back')">Upper Back</a>
      </div>
    </span>

    <input type="text" v-model="searchWords">
    <button @click="updateExercisesOnPage()">Workout Title Search...</button>
    <p></p>
    <div class="container">
      <div class="row">
        <div class="col-sm-4" v-for="exercise in exercisesOnPage">
          <div class="card">
            <div class="card-body">
              <img class="card-img-top" v-bind:src="exercise.gifUrl" alt="Card image cap">
              <h5 class="card-title">{{exercise.name}}</h5>
              <p class="card-text">{{exercise.target}}</p>
              <button @click="openOptions(exercise)">Add to Workout...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <!-- Previous button -->
      <li class="page-item disabled" v-if="pageNumber == 1">
        <a class="page-link" href="#">Previous</a>
      </li>
      <li class="page-item" v-if="pageNumber != 1">
        <a class="page-link" @click="setPrevPageNumber()">Previous</a>
      </li>
      <li class="page-item" v-if="pageNumber >= 5">
        <a class="page-link" @click="setPageNumber(1)">1</a>
      </li>
      <li class="page-item" v-for="page in exercisePageAmount" :key="page">
        <!-- ... Button for over 3 numbers -->
      <li class="page-item disabled" v-if="page == pageNumber+3">
        <a class="page-link" href="#">...</a>
      </li>
      <li class="page-item disabled" v-if="page == pageNumber-3">
        <a class="page-link" href="#">...</a>
      </li>
      <!-- Numbered buttons -->
      <a class="page-link" @click="setPageNumber(page)"
        v-if="page != pageNumber  && page > pageNumber-3 && page < pageNumber+3">{{page}}</a>
      <a class="page-link active" @click="setPageNumber(page)" v-if="page == pageNumber">{{page}}</a>
      </li>
      <!-- Next Button -->
      <li class="page-item" v-if="pageNumber <= exercisePageAmount-4">
        <a class="page-link" @click="setPageNumber(this.exercisePageAmount)">{{exercisePageAmount}}</a>
      </li>
      <li class="page-item" v-if="pageNumber == exercisePageAmount">
        <a class="page-link disabled" href="#">Next</a>
      </li>
      <li class=" page-item" v-if="pageNumber != exercisePageAmount">
        <a class="page-link" @click="setNextPageNumber()">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style>

</style>