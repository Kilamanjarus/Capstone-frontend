<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Workouts!",
      workouts: {},
      newWorkout: {},
      selectedWorkout: {},
    };
  },
  created: function () {
    this.workoutsIndex();
  },
  methods: {
    workoutsIndex: function () {
      // console.log(`Getting workouts...`)
      axios.get(`http://localhost:3000/workouts.json`).then(response => {
        // console.log(response.data)
        this.workouts = response.data
      })
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <p><b>All Workouts!</b></p>
  <!-- Card -->
  <div class="container">
    <div class="row">
      <div class="col-sm-4" v-for="workout in workouts">
        <div class="card">
          <div class="card-body">
            <a id="workout-title" v-bind:href="`/workouts/${workout.id}`"> {{ workout.title }}</a>
            <!-- Carousel -->
            <div v-bind:id="`carousel-workouts-${workout.id}`" class="carousel carousel-dark carousel-fade"
              data-bs-ride="carousel">
              <div class="carousel-inner" v-for="(routine, idx) in workout.routines">
                <div class="carousel-item" :class="{ active: idx==0 }">
                  <img v-bind:src="routine.exercise.gifUrl" class="d-block w-100" alt="">
                  <div class="carousel-caption d-none d-md-block">
                    <h5 id="rout-exer-name">{{routine.exercise.name}}</h5>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button"
                v-bind:data-bs-target="`#carousel-workouts-${workout.id}`" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button"
                v-bind:data-bs-target="`#carousel-workouts-${workout.id}`" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="false"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background: silver;
}

#workout-title {
  font-size: 2.5em;
}

#rout-exer-name {
  color: red;
}

.carousel {
  margin: auto;
}
</style>