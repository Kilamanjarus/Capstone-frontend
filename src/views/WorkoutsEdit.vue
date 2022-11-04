<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Workout Edit Page",
      workout: {},
      currentRoutine: {},
      error: "",
    };
  },
  created: function () {
    this.workoutsShow();
  },
  methods: {
    workoutsShow: function () {
      // console.log(`Showing selected workout....`)
      axios.get(`http://localhost:3000/workouts/${this.$route.params.id}.json`).then(response => {
        this.workout = response.data
      }).catch(error => {
        this.error = error.code
        // console.log(this.error)
      })
    },
    routineUpdate: function (routine) {
      // console.log('Updating Exercise...')
      // console.log(currentExercise)
      routine.sets.forEach(set => {
        axios.patch(`http://localhost:3000/routinesets/${set.id}.json`, set).then(response => {
          console.log(response.data)
        }).catch((error) => {
          this.errors = error.response.data.errors;
          // console.log(this.errors)
        });
      })
    },
    routineDelete: function (routine) {
      if (confirm('Are you sure? Permanently delete routine from your workout?')) {
        // console.log(routine)
        axios.delete(`http://localhost:3000/routines/${routine.routine_id}.json`).then(response => {
          // console.log(`Deleting exercise from routine...`)
          // console.log(response.data)
          this.reloadPage();
        })
      }
    },
    workoutDelete: function (workout) {
      if (confirm('Are you sure? Permanently delete your workout?')) {
        // console.log(routine)
        axios.delete(`http://localhost:3000/workouts/${workout.id}.json`).then(response => {
          // console.log(`Deleting exercise from routine...`)
          // console.log(response.data)
          this.reloadPage();
        })
      }
    },
    reloadPage: function () {
      window.location.reload();
    },
  },
  workoutEdit: function () {
    // console.log(`Editing selected workout...`)
  }
};
</script> 

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-if="this.error == `ERR_BAD_RESPONSE`">Workout Does not exist, check URL and try again.</div>
    <p><button class="btn btn-danger" @click="this.workoutDelete(this.workout)">Delete Workout</button></p>
    <h2> {{workout.title}} </h2>
    <div v-for="routine in workout.routines">
      <h3><b>{{routine.exercise.name}}</b></h3>
      <div><b>Exercise Style: </b>{{routine.exercise.style}}</div>
      <div><b>Exercise Muscle: </b>{{routine.exercise.muscle}}</div>
      <div><b>Sets: </b></div>
      <div v-for="set in routine.sets"><input type="text" v-model="set.added_weight">lbs <input type="text"
          v-model="set.reps">reps</div>
      <p></p>
      <button class="btn btn-primary" @click="routineUpdate(routine)">Update Routine</button> | <button
        class="btn btn-danger" @click="this.routineDelete(routine)" onclick="">Delete Routine</button>
      <p></p>
    </div>
  </div>
</template>

<style>

</style>