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
      params: {},
      editEquipment: false,
      equipments: [],
      equipmentExcercises: []
    };
  },
  created: function () {
    this.exercisesIndex();
    this.equipmentIndex();
    this.filterExercises();
  },
  methods: {
    exercisesIndex: function () {
      axios.get("http://localhost:3000/exercises.json").then(response => {
        this.exercises = response.data
        this.updateExercisesOnPage();
      })
    },
    equipmentIndex: function () {
      axios.get("http://localhost:3000/equipment.json").then(response => {
        this.equipments = response.data
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
      if (exercise.equipment == "Body Weight" || exercise.equipment == "Assisted" || exercise.equipment == "Wheeler Roller" || exercise.equipment == "Stability Ball") {
        this.newRoutine.added_weight = 0
      }
      console.log(this.newRoutine)
      axios.post("http://localhost:3000/routines.json", this.newRoutine).then(response => {
        // console.log(response.data)
        this.newRoutine = {}
      })
      exercise.on_routine = true;
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
      this.exercisesOnPage = []
      for (let i = 0; i < this.exercisesPerPage; i++) {
        if (this.filterExercises()[i + (this.exerciseIndex * this.exercisesPerPage)]) {
          this.exercisesOnPage.push(this.filterExercises()[i + (this.exerciseIndex * this.exercisesPerPage)])
        }
      }
      if (this.filterExercises().length / this.exercisesPerPage % 1 > 0) {
        this.exercisePageAmount = Math.ceil(this.filterExercises().length / this.exercisesPerPage)
      }
      else {
        this.exercisePageAmount = Math.ceil(this.filterExercises().length / this.exercisesPerPage)
      }
    },
    filterExercises: function () {
      return this.exercises.filter(exercise => {
        return exercise.name.toLowerCase().includes(this.searchWords.toLowerCase()) && exercise.style.includes(this.muscleGroup) && exercise.own_equipment == true
      })
    },
    filterMuscles: function (word) {
      this.muscleGroup = word
      this.updateExercisesOnPage();
    },
    toggleEquipmentOwner: function (equipment) {
      this.params.id = equipment.id
      if (equipment.owner) {
        axios.delete(`http://localhost:3000/userequipment/${equipment.id}`).then(response => {
          this.equipmentIndex();
        })
      } else {
        axios.post(`http://localhost:3000/userequipment`, this.params).then(response => {
          this.equipmentIndex();
        })
      }
    },
    filterEquipment: function () {
      this.equipmentArray.forEach(equipment => {
        this.equipmentExcercises << this.exercises.filter(exercise => {
          return exercise.style.includes(equipment)
        })
      })
      return this.equipmentExcercises
    },
    editRoutine: function () {
      this.$router.push("/routines")
    },
    toggleEquipment: function () {
      this.editEquipment = !this.editEquipment
    },
    reloadPage: function () {
      window.location.reload();
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- Equipment Search W/ Edit Button -->
    <button @click="toggleEquipment()">Edit Your Equipment...</button>
    <p></p>
    <div v-if="this.editEquipment == true">
      <div v-for="arrays in equipments">
        <div class="form-switch form-check-inline" v-for="equipment in arrays">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
            @change="toggleEquipmentOwner(equipment)" checked v-if="equipment.owner">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckdefault"
            @change="toggleEquipmentOwner(equipment)" v-if="!equipment.owner">
          <label class="form-check-label" for="flexSwitchCheckChecked"><b>{{equipment.name}}</b></label>
        </div>

        <p></p>
      </div>
      <button @click="reloadPage">Update Search Settings...</button>
      <p></p>
    </div>
    <!-- Muscle Group Search -->
    <span class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Muscle Group
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="filterMuscles('')">All</a>
        <a class="dropdown-item" @click="filterMuscles('Adductors')">Adductors</a>
        <a class="dropdown-item" @click="filterMuscles('Abductors')">Adductors</a>
        <a class="dropdown-item" @click="filterMuscles('Abs')">Abs</a>
        <a class="dropdown-item" @click="filterMuscles('Biceps')">Biceps</a>
        <a class="dropdown-item" @click="filterMuscles('Calves')">Calves</a>
        <a class="dropdown-item" @click="filterMuscles('Cardiovascular System')">Cardio</a>
        <a class="dropdown-item" @click="filterMuscles('Delts')">Delts</a>
        <a class="dropdown-item" @click="filterMuscles('Forearms')">Forearms</a>
        <a class="dropdown-item" @click="filterMuscles('Glutes')">Glutes</a>
        <a class="dropdown-item" @click="filterMuscles('Hamstrings')">Hamstrings</a>
        <a class="dropdown-item" @click="filterMuscles('Levator scapulae')">Levator Scapulae</a>
        <a class="dropdown-item" @click="filterMuscles('Pectorals')">Pectorals</a>
        <a class="dropdown-item" @click="filterMuscles('Quads')">Quads</a>
        <a class="dropdown-item" @click="filterMuscles('Serratus anterior')">Serratus Anterior</a>
        <a class="dropdown-item" @click="filterMuscles('Spine')">Spine</a>
        <a class="dropdown-item" @click="filterMuscles('Lats')">Lats</a>
        <a class="dropdown-item" @click="filterMuscles('Traps')">Traps</a>
        <a class="dropdown-item" @click="filterMuscles('Triceps')">Triceps</a>
        <a class="dropdown-item" @click="filterMuscles('Upper back')">Upper Back</a>
      </div>
    </span>
    <!-- Title Word Search -->
    <input type="text" v-model="searchWords" @change="updateExercisesOnPage()" placeholder="Exercise Title...">
    <button @click="updateExercisesOnPage()">Workout Title Search...</button>
    <p></p>
    <!-- Cards for Exercises -->
    <div class="container">
      <div class="row">
        <div class="col-sm-4" v-for="exercise in exercisesOnPage">
          <div class="card">
            <div class="card-body">
              <img class="card-img-top" v-bind:src="exercise.gifUrl" alt="Card image cap">
              <h5 class="card-title">{{exercise.name}}</h5>
              <p class="card-text">{{exercise.style}}</p>
              <div v-if="exercise.on_routine == false">
                <button @click="openOptions(exercise)">Add to Workout...</button>
              </div>
              <div v-if="exercise.on_routine == true">
                <button @click="editRoutine()">Edit Routine...</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal for Exercise Add to Workout -->
  <dialog id="routine-details">
    <form method="dialog">
      <h1>Exercise info</h1>
      <p><b>Exercise Name:</b> {{ currentExercise.name }}</p>
      <p><b>Exercise Target:</b> {{ currentExercise.style }}</p>
      <p><b>Exercise Muscle Grouping:</b> {{ currentExercise.muscle }}</p>
      <p><b>Exercise Equipment:</b> {{ currentExercise.equipment }}</p>
      <p>To create a Routine for your Workout, please enter the information needed below...</p>
      <p><b>Sets: </b><input type="text" v-model="newRoutine.sets"></p>
      <p><b>Reps: </b><input type="text" v-model="newRoutine.reps"></p>
      <p
        v-if="currentExercise.equipment==`Body Weight` || currentExercise.equipment==`Assisted` || currentExercise.equipment==`Wheel Roller` || currentExercise.equipment == `Stability Ball`">
      </p>
      <p v-else><b>Added Weight: </b><input type=" text" v-model="newRoutine.added_weight">
      </p>
      <button @click="routineCreate(currentExercise)">Create Routine...</button>
      <button>Close</button>
    </form>
  </dialog>

  <p v-if="filterExercises()==nil">Test</p>

  <!-- Pagination -->
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
.form-check-label {
  width: 180px;
}

.card {
  height: 100%;
}
</style>