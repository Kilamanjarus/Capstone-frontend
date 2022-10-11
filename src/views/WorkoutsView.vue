<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Workouts!",
      workouts: {},
      newWorkout: {},
      selectedWorkout: {},

      workoutPageAmount: 5,
      workoutsPerPage: 6,
      pageNumber: 1,
      workoutsIndexNumber: 0,
      workoutsOnPage: [],

      home: 1,
      error: "",
      searchWords: "",
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
        this.updateWorkoutsOnPage();
      })
    },
    updateWorkoutsOnPage: function (page) {
      this.workoutsOnPage = []
      this.error = ""
      for (let i = 0; i < this.workoutsPerPage; i++) {
        if (this.filterWorkouts()[i + (this.workoutsIndexNumber * this.workoutsPerPage)]) {
          this.workoutsOnPage.push(this.filterWorkouts()[i + (this.workoutsIndexNumber * this.workoutsPerPage)])
        }
      }
      if (this.filterWorkouts().length / this.workoutsPerPage % 1 > 0) {
        this.workoutPageAmount = Math.ceil(this.filterWorkouts().length / this.workoutsPerPage)
      }
      else {
        this.workoutPageAmount = Math.ceil(this.filterWorkouts().length / this.workoutsPerPage)
      }
      if (this.filterWorkouts().length == 0) {
        this.error = "ERR_BAD_RESPONSE"
      }
    },
    filterWorkouts: function () {
      return this.workouts.filter(workout => {
        return workout.title.toLowerCase().includes(this.searchWords.toLowerCase())
      })
    },
    setPageNumber: function (page) {
      // console.log(page)
      this.pageNumber = page
      this.workoutsIndexNumber = page - 1
      // console.log(this.pageNumber)
      this.updateWorkoutsOnPage(page);
      window.scrollTo(0, 0);
    },
    setPrevPageNumber: function () {
      this.pageNumber = this.pageNumber - 1
      this.workoutsIndexNumber = this.pageNumber - 1
      // console.log(this.pageNumber)
      this.updateWorkoutsOnPage(this.pageNumber);
      window.scrollTo(0, 0);
    },
    setNextPageNumber: function () {
      // console.log(this.pageNumber)
      this.pageNumber = this.pageNumber + 1
      this.workoutsIndexNumber = this.pageNumber - 1
      window.scrollTo(0, 0);
      this.updateWorkoutsOnPage(this.pageNumber);
      // console.log(this.pageNumber)
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <!-- Search Bar -->
  <input type="text" v-model="searchWords" @change="setPageNumber(home) &&updateWorkoutsOnPage()"
    placeholder="Workout Title...">
  <button class="btn btn-primary" @click="setPageNumber(home) && updateWorkoutsOnPage()">Workout Title
    Search...</button>
  <p></p>
  <!-- Card -->
  <div class="container">
    <div class="row">
      <div class="col-sm-4" v-for="workout in workoutsOnPage">
        <div class="card h-100">
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
      <li class="page-item" v-for="page in workoutPageAmount" :key="page">
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
      <li class="page-item" v-if="pageNumber <= workoutPageAmount-4">
        <a class="page-link" @click="setPageNumber(this.workoutPageAmount)">{{workoutPageAmount}}</a>
      </li>
      <li class="page-item" v-if="pageNumber == workoutPageAmount">
        <a class="page-link disabled" href="#">Next</a>
      </li>
      <li class=" page-item" v-if="pageNumber != workoutPageAmount">
        <a class="page-link" @click="setNextPageNumber()">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style>
body {
  background: silver;
}

#workout-title {
  font-size: 2.2em;
}

#rout-exer-name {
  color: red;
}

.carousel {
  margin: auto;
}
</style>