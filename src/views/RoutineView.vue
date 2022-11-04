<script>
import router from "@/router";
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to your current routines! Here you can edit them, delete them, or if you like your workout give it a title and publish it!",
      routines: [],
      newWorkout: {},
      editMode: false,
      error: "",
    };
  },
  created: function () {
    this.routineIndex();
  },
  methods: {
    routineIndex: function () {
      // console.log("Pulling all Exercises added to workouts...")
      axios.get("http://localhost:3000/routines.json").then(response => {
        console.log(response.data)
        this.routines = response.data
      })
    },
    routineUpdate: function (currentExercise) {
      // console.log('Updating Exercise...')
      // console.log(currentExercise)
      currentExercise.sets.forEach(set => {
        axios.patch(`http://localhost:3000/routinesets/${set.id}.json`, set).then(response => {
          console.log(response.data)
        }).catch((error) => {
          this.errors = error.response.data.errors;
          // console.log(this.errors)
        });
      })
    },
    routineDelete: function (currentExercise) {
      if (confirm('Are you sure? Permanently delete routine from your workout?')) {
        axios.delete(`http://localhost:3000/routines/${currentExercise.id}).json`).then(response => {
          // console.log(`Deleting exercise from routine...`)
          // console.log(response.data)
          location.reload();
        })
      }
    },
    workoutCreate: function () {
      // console.log(`Creating new workout...`)
      // console.log(this.newWorkout)
      axios.post(`http://localhost:3000/workouts.json`, this.newWorkout).then(response => {
        // console.log(response.data)
        this.newWorkout = response.data
        this.$router.push(`/workouts/${this.newWorkout.id}`)
      })
    },
    toggleEdit: function () {
      // console.log(this.editMode)
      this.editMode = !this.editMode
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <p v-if="this.editMode == false"><button class="btn btn-primary" @click="toggleEdit()">Edit Mode</button></p>
  <p v-if="this.editMode == true"><button class="btn btn-primary" @click="toggleEdit()">Leave Edit Mode</button></p>
  <p>Current Routines:</p>
  <div>
    <!-- Cards for Routines -->
    <div v-for="currentExercise in routines">
      <div class="card mb-3" v-if="currentExercise.status === 'added'">
        <div class="row no-gutters">
          <!-- Picture -->
          <div class="col-md-3">
            <img class="card-img" v-bind:src="currentExercise.exercise.gifUrl" alt="...">
          </div>
          <!-- Info -->
          <div class="col-md-7 my-auto">
            <div class="card-body">
              <h3 class="card-title">{{currentExercise.exercise.name}}</h3>
              <h5 class="card-text"><b>{{currentExercise.exercise.style}}</b></h5>
              <h4 class="card-text"><b>Equipment: </b>{{currentExercise.exercise.equipment}}</h4>
              <!-- Sets -->
              <h4 class="card-text" v-if="editMode == false"><b>Sets:
                </b>
                <h4 v-for="set in currentExercise.sets">
                  <!-- Weight -->
                  <h4>{{set.added_weight}} lbs by {{set.reps}} reps.</h4>
                </h4>
              </h4>
              <h4 class="card-text" v-if="editMode == true"><b>Sets:
                </b>
                <h4 v-for="set in currentExercise.sets">
                  <!-- Weight -->
                  <input type="text" v-model="set.added_weight"> lbs by <input type="text" v-model="set.reps"> reps.
                </h4>
              </h4>
              <!-- Reps -->
              <!-- <h4 class="card-text" v-if="editMode == false"><b>Reps:
                </b>{{currentExercise.reps}}</h4>
              <h4 class="card-text" v-if="editMode == true"><b>Reps: </b>
                <input type="text" v-model="currentExercise.reps">
              </h4> -->
              <!-- Update Button -->
              <button class="btn btn-primary" @click="routineUpdate(currentExercise)" v-if="editMode == true">Update
                Exorcise</button>
              <span v-if="editMode == true"> | </span>
              <button class="btn btn-danger" @click="routineDelete(currentExercise)" v-if="editMode == true">Delete
                Exorcise</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Workout Create -->
  <span>
    <h3><b>Workout Title: </b></h3>
    <p><input type="text" v-model="newWorkout.title"></p>
    <button class="btn btn-primary" @click="workoutCreate">Create
      Workout</button>
  </span>
</template>

<style>

</style>