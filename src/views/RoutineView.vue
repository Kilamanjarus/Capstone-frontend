<script>
import router from "@/router";
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      routines: {},
      newWorkout: {},
      editMode: false,
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
        this.routines.splice(`${currentExercise}`, 1)
      })
    },
    workoutCreate: function () {
      console.log(`Creating new workout...`)
      console.log(this.newWorkout)
      axios.post(`http://localhost:3000/workouts.json`, this.newWorkout).then(response => {
        console.log(response.data)
        this.$router.push("/workouts")
      })
    },
    toggleEdit: function () {
      console.log(this.editMode)
      this.editMode = !this.editMode
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <p><b>Edit Mode: </b> <button @click="toggleEdit()">Test</button></p>
  <p>Current Routines:</p>
  <div>
    <div v-for="currentExercise in routines">
      <div v-if="currentExercise.status === `added` && editMode === true">
        {{ currentExercise.id }}
        {{ currentExercise.exercise.name }}
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
    <div class="container">
      <div class="row">
        <div class="col-sm-6" v-for="currentExercise in routines">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{currentExercise.exercise.name}}</h3>
              <h4 class="card-text"><b>{{currentExercise.exercise.style}}</b></h4>
              <img class="card-img-top" v-bind:src="currentExercise.exercise.gifUrl" alt="Card image cap">
              <p class="card-text" v-if="currentExercise.added_weight != nil && editMode == false"><b>Added
                  Weight: </b>{{currentExercise.added_weight}}</p>
              <p class="card-text" v-if="currentExercise.added_weight != nil && editMode == true"><b>Added Weight:
                </b>
                <input type="text" v-model="currentExercise.added_weight">
              </p>
              <p class="card-text" v-if="currentExercise.sets != nil && editMode == false"><b>Sets:
                </b>{{currentExercise.sets}}</p>
              <p class="card-text" v-if="currentExercise.sets != nil && editMode == true"><b>Sets: </b>
                <input type="text" v-model="currentExercise.sets">
              </p>
              <p class="card-text" v-if="currentExercise.reps != nil && editMode == false"><b>Reps:
                </b>{{currentExercise.reps}}</p>
              <p class="card-text" v-if="currentExercise.reps != nil && editMode == true"><b>Reps: </b>
                <input type="text" v-model="currentExercise.reps">
              </p>
              <button @click="routineUpdate(currentExercise)" v-if="editMode == true">Update Exorcise</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <b>Workout Title: </b><input type="text" v-model="newWorkout.title"> <button @click="workoutCreate">Create
    Workout</button>
</template>

<style>

</style>