<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Workout!",
      workout: {},
      routines: {}
    };
  },
  created: function () {
    this.workoutsShow();
  },
  methods: {
    workoutsShow: function () {
      console.log(`Showing selected workout....`)
      axios.get(`http://localhost:3000/workouts/${this.$route.params.id}.json`).then(response => {
        console.log(response.data)
        this.workout = response.data
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{workout.title}}</h1>
    <a v-bind:href="`/workouts/${this.$route.params.id}/edit`" v-if="workout.owner">Edit</a>
  </div>
  <!-- c\Carousel -->
  <div id="carousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-inner" v-for="routine in workout.routines">
      <!-- First Active Panel -->
      <div class="carousel-item active" v-if="routine == workout.routines[0]">

        <img v-bind:src="routine.exercise.gifUrl" class="d-block w-100" alt="">

        <div class="carousel-caption d-none d-md-block">
          <h5>{{routine.exercise.name}}</h5>
          <p v-if="routine.added_weight == null">{{routine.sets}} Sets of {{routine.reps}}</p>
          <p v-if="routine.added_weight != null">{{routine.sets}} Sets of {{routine.reps}} with a weight
            of{{routine.added_weight}}</p>
        </div>
      </div>
      <!-- If Generation Panels -->
      <div class="carousel-item" v-if="routine != workout.routines[0]">

        <img v-bind:src="routine.exercise.gifUrl" class="d-block w-100" alt="">

        <div class="carousel-caption d-none d-md-block ">
          <h5>{{routine.exercise.name}}</h5>
          <p v-if="routine.added_weight == null">{{routine.sets}} Sets of {{routine.reps}}</p>
          <p v-if="routine.added_weight != null">{{routine.sets}} Sets of {{routine.reps}} with a weight
            of{{routine.added_weight}}</p>
        </div>
      </div>
    </div>
    <!-- Carousel Controls -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="false"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="false"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

</template>

<style>
.carousel {
  height: 500px;
  width: 500px;
  margin: auto;
}

.carousel-caption {
  margin-bottom: -50px;
}

body {
  margin-bottom: 50px;
}
</style>