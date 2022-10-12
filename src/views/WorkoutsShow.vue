<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Workout!",
      workout: {},
      routines: {},
      userVotes: [],

      userUpvotes: 0,
      userDownvotes: 0,

      params: {}
    };
  },
  created: function () {
    this.workoutsShow();
  },
  methods: {
    userVoteIndex: function () {
      axios.get("http://localhost:3000/votes").then(response => {
        console.log(response.data)
        this.userVotes = response.data
        this.userVoteCount();
      })
    },
    workoutsShow: function () {
      // console.log(`Showing selected workout....`)
      axios.get(`http://localhost:3000/workouts/${this.$route.params.id}.json`).then(response => {
        // console.log(response.data)
        this.workout = response.data
        this.userVoteIndex();
      })
    },
    workoutUpVote: function () {
      // console.log(`Starting Upvote process...`)
      // console.log(this.workout.voted)
      if (this.workout.vote == null) {
        // console.log("Null, creating vote")
        this.params = { vote: true, workout_id: this.workout.id }
        axios.post(`http://localhost:3000/votes`, this.params).then(response => {
          this.workout.vote = response.data
          // console.log(this.workout)
          this.userVoteIndex();
        })
      } else if (this.workout.vote.vote == false) {
        // console.log("Vote is false, changing to true")
        this.params = { vote: true }
        axios.patch(`http://localhost:3000/votes/${this.workout.vote.id}`, this.params).then(response => {
          // console.log(response.data)
          this.workout.vote = response.data
          this.userVoteIndex();
        })
      }
      else {
        // console.log("Upvoted previously, removing upvote")
        axios.delete(`http://localhost:3000/votes/${this.workout.vote.id}`).then(response => {
          // console.log(response.data)
          this.workout.vote = null
          this.userVoteIndex();
        })
      }
    },
    workoutDownVote: function () {
      // console.log(`Starting Downvote process...`)
      // console.log(this.workout.voted)
      if (this.workout.vote == null) {
        // console.log("Null, creating vote")
        this.params = { vote: false, workout_id: this.workout.id }
        axios.post(`http://localhost:3000/votes`, this.params).then(response => {
          this.workout.vote = response.data
          // console.log(this.workout)
          this.userVoteIndex();
        })
      } else if (this.workout.vote.vote == true) {
        // console.log("Vote is true, changing to false")
        this.params = { vote: false }
        axios.patch(`http://localhost:3000/votes/${this.workout.vote.id}`, this.params).then(response => {
          // console.log(response.data)
          this.workout.vote = response.data
          this.userVoteIndex();
        })
      } else {
        // console.log("Downvoted previously, removing upvote")
        axios.delete(`http://localhost:3000/votes/${this.workout.vote.id}`).then(response => {
          // console.log(response.data)
          this.workout.vote = null
          this.userVoteIndex();
        })
      }
    },
    userVoteCount: function () {
      console.log("Starting vote count")
      this.userDownvotes = 0
      this.userUpvotes = 0
      this.userVotes.forEach(vote => {
        console.log(vote)
        if (vote.vote == true) {
          this.userUpvotes += 1
        } else if (vote.vote == false) {
          this.userDownvotes += 1
        }
      })
      console.log(this.userUpvotes)
      console.log(this.userDownvotes)
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{workout.title}}</h1>
    <h3>Published by: {{workout.user.first_name}} {{workout.user.last_name}}</h3>
    <h4>Age {{workout.user.age}}</h4>
    <h4>Email: {{workout.user.email}}</h4>
    <a class="btn btn-primary" v-bind:href="`/workouts/${this.$route.params.id}/edit`" v-if="workout.owner">Edit</a>
    <p>
      <span><button class="btn btn-success" @click="this.workoutUpVote()">Upvote</button></span> | |
      <span><button class="btn btn-warning" @click="this.workoutDownVote()">Downvote</button></span>
    </p>
    <h5> <b>User Upvotes: </b>{{this.userUpvotes}} <b>User Downvotes: </b>{{this.userDownvotes}}</h5>
    <p v-if="workout.owner">
    </p>
  </div>
  <!-- c\Carousel -->
  <div id="carousel" class="carousel carousel-dark carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner" v-for="(routine, idx) in workout.routines">
      <!-- First Active Panel -->
      <div class="carousel-item" :class="{ active: idx==0 }">
        <img v-bind:src="routine.exercise.gifUrl" class="d-block w-100" alt="">
        <div class="carousel-caption d-none d-md-block">
          <h2 class="exercise-name">{{routine.exercise.name}}</h2>
          <div>Exercise number {{idx + 1}}</div>
          <div v-if="routine.added_weight == null || routine.added_weight == 0">{{routine.sets}} Sets of
            {{routine.reps}}</div>
          <div v-if="routine.added_weight != null  && routine.added_weight != 0">{{routine.sets}} Sets of
            {{routine.reps}} with a weight
            of {{routine.added_weight}}</div>
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
  <p></p>
  <a class="btn btn-secondary" href="/workouts">Return to Workouts</a>
</template>

<style>
#carousel {
  height: 500px;
  width: 500px;
  margin: auto;
}

.carousel-caption {
  margin-bottom: -45px;
}

.exercise-name {
  margin-bottom: 420px;
}

body {
  margin-bottom: 50px;
}
</style>