<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Workout!",
      workout: {},
      routines: {},
      userVotes: [],

      newRoutine: {},

      userUpvotes: 0,
      userDownvotes: 0,

      params: {},
      paramsIndex: {},

      userFavorites: [],
      favorited: false,
      favoriteID: 0,

      comments: [],
      postComments: [],
      newComment: { comment: "Enter text here..." },

      commentVotes: [],
      newCommentVote: {},
      commentScore: 0,

      userID: localStorage.userID,
    };
  },
  created: function () {
    this.workoutsShow();
  },
  methods: {
    workoutsShow: function () {
      // console.log(`Showing selected workout....`)
      axios.get(`http://localhost:3000/workouts/${this.$route.params.id}.json`).then(response => {
        // console.log(response.data)
        this.workout = response.data
        this.userVoteIndex();
        this.userFavoriteIndex();
        this.commentsIndex();
      })
    },
    workoutUpVote: function () {
      // console.log(`Starting Upvote process...`)
      // console.log(this.workout.voted)
      if (this.workout.vote == null) {
        // console.log("Null, creating vote")
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
    userVoteIndex: function () {
      axios.get(`http://localhost:3000/votes/${this.workout.id}`).then(response => {
        // console.log(response.data)
        this.userVotes = response.data
        this.userVoteCount();
      })
    },
    userVoteCount: function () {
      // console.log("Starting vote count")
      this.userDownvotes = 0
      this.userUpvotes = 0
      this.userVotes.forEach(vote => {
        // console.log(vote)
        if (vote.vote == true) {
          this.userUpvotes += 1
        } else if (vote.vote == false) {
          this.userDownvotes += 1
        }
      })
      // console.log(this.userUpvotes)
      // console.log(this.userDownvotes)
    },
    userFavoriteIndex: function () {
      // console.log("Favorited index...")
      axios.get(`http://localhost:3000/favorites.json`).then(response => {
        // console.log(response.data)
        this.userFavorites = response.data
        this.userFavoriteCheck();
      })
    },
    userFavoriteCheck: function () {
      // console.log("Searching for favorite")
      this.userFavorites.forEach(userFav => {
        // console.log(userFav)
        if (userFav.workout_id == this.workout.id && userFav.user_id == this.userID) {
          // console.log("True")
          this.favorited = true
        }
      })
      // console.log(this.favorited)
    },
    userAddFavorite: function () {
      // console.log("Adding favorite.")
      this.params = { workout_id: this.workout.id, user_id: this.userID }
      axios.post(`http://localhost:3000/favorites.json`, this.params).then(response => {
        // console.log(response.data)
        this.userFavoriteIndex();
      })
    },
    userRemoveFavorite: function () {
      // console.log("Adding favorite.")
      this.userFavorites.forEach(userFav => {
        console.log(userFav)
        if (userFav.workout_id == this.workout.id && userFav.user_id == this.userID) {
          this.favoriteID = userFav.id
        }
      })
      axios.delete(`http://localhost:3000/favorites/${this.favoriteID}`).then(response => {
        // console.log(response.data)
        this.userFavoriteIndex();
      })
    },
    copyWorkoutRoutines: function () {
      // console.log(`Creating new routine....`)
      // console.log(exercise)
      this.workout.routines.forEach(routine => {
        console.log(routine)
        this.newRoutine.exercise_id = routine.exercise_id
        this.newRoutine.added_weight = routine.added_weight
        this.newRoutine.reps = routine.reps
        this.newRoutine.sets = routine.sets
        axios.post("http://localhost:3000/routines.json", this.newRoutine).then(response => {
          console.log(response.data)
          this.newRoutine = {}
        })
      })
      // console.log(this.newRoutine)
    },
    commentsIndex: function () {
      console.log("Getting comments")
      axios.get(`http://localhost:3000/comments.json`).then(response => {
        console.log(response.data)
        this.postComments = []
        this.comments = response.data
        this.comments.forEach(comment => {
          // console.log(comment.workout_id)
          // console.log(this.workout.id)
          if (comment.workout_id == this.workout.id) {
            this.commentScore = 0
            comment.likes.forEach(like => {
              if (like.status == "Liked") {
                this.commentScore++
              } else if (like.status == "Disliked") {
                this.commentScore--
              }
            })
            comment.score = this.commentScore
            console.log(comment)
            this.postComments.push(comment)
          }
        })
        // console.log("Post Comments:")
        // console.log(this.postComments)
      })
    },
    commentPost: function () {
      // console.log("Posting Comment")
      this.newComment.workout_id = this.workout.id
      // console.log(this.newComment)
      axios.post(`http://localhost:3000/comments`, this.newComment).then(response => {
        // console.log(response.data)
        this.commentsIndex();
      })
    },
    commentDelete: function (comment) {
      // console.log(comment)
      if (comment.owner == true) {
        axios.delete(`http://localhost:3000/comments/${comment.id}`).then(response => {
          // console.log(response.data)
          this.commentsIndex();
        })
      }
      // console.log("Deleting Comment")
    },
    commentLike: function (comment) {
      console.log("Liking Comment")
      console.log(this.userID)
      if (comment.user_liked.status == "Liked") {
        console.log("User has liked comment previously")
      } else if (comment.user_liked == null) {
        this.params = {}
        this.params.user_workout_comment_id = comment.id
        this.params.status = "Liked"
        this.params.user_id = this.userID
        axios.post("http://localhost:3000/commentlikes.json", this.params).then(response => {
          console.log(response.data)
          this.commentsIndex();
        })
      } else if (comment.user_liked.status == "Disliked") {
        console.log("User has previously disliked comment, liking comment.")
        this.params.status = "Liked"
        this.params.user_id = this.userID
        console.log(comment.id)
        axios.patch(`http://localhost:3000/commentlikes/${comment.user_liked.id}.json`, this.params).then(response => {
          console.log(response.data)
          this.commentsIndex();
        })
      }
    },
    commentDislike: function (comment) {
      console.log("Disliking Comment")
      console.log(this.userID)
      if (comment.user_liked.status == "Disliked") {
        console.log("User has Disliked comment previously")
      } else if (comment.user_liked == null) {
        this.params = {}
        this.params.user_workout_comment_id = comment.id
        this.params.status = "Disliked"
        this.params.user_id = this.userID
        axios.post("http://localhost:3000/commentlikes.json", this.params).then(response => {
          console.log(response.data)
          this.commentsIndex();
        })
      } else if (comment.user_liked.status == "Liked") {
        console.log("User has previously liked comment, disliking comment.")
        this.params.status = "Disliked"
        this.params.user_id = this.userID
        console.log(comment.id)
        axios.patch(`http://localhost:3000/commentlikes/${comment.user_liked.id}.json`, this.params).then(response => {
          console.log(response.data)
          this.commentsIndex();
        })
      }
    },
  }
};
</script>

<template>
  <div class="home">
    <!-- Information -->
    <h1>{{workout.title}}</h1>
    <h3>Published by: {{workout.user.username}}</h3>
    <h4>Age {{workout.user.age}}</h4>
    <h4>Email: {{workout.user.email}}</h4>
    <a class="btn btn-primary" v-bind:href="`/workouts/${this.$route.params.id}/edit`" v-if="workout.owner">Edit</a>
    <!-- Voting Section -->
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;<span><button class="btn btn-success" @click="this.workoutUpVote()">Upvote</button></span>
      | |
      <span><button class="btn btn-warning" @click="this.workoutDownVote()">Downvote</button></span>
    </p>
    <h5> <b>User Upvotes: </b>{{this.userUpvotes}} <b>User Downvotes: </b>{{this.userDownvotes}}</h5>
    <!-- Favorite Section -->
    <p v-if="this.favorited == false"><button class="btn btn-primary" @click="userAddFavorite()">Favorite!</button>
    </p>
    <p v-if="this.favorited == true"><button class="btn btn-warning" @click="userRemoveFavorite()">UnFavorite!</button>
    </p>

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
          <div class="bottom-text">
            <div>Exercise number {{idx + 1}} of {{this.workout.routines.length}}</div>
            <span>
              <b>Sets:</b>
              <div v-for="set in routine.sets">
                <span v-if="set.added_weight != 0">{{set.added_weight}} lbs by {{set.reps}} reps</span>
                <span v-if="set.added_weight == 0">{{set.reps}} reps</span>
              </div>
            </span>
          </div>
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
  <!-- Comments -->
  <p></p>
  <label for="comment">How do you like this workout?</label>
  <br>
  <span>
    <textarea id="comment" name="comment" rows="4" cols="50" v-model="this.newComment.comment"></textarea> {{ }}
    <button id="postCommentButton" class="btn btn-primary" @click="this.commentPost()">Post Comment</button>
  </span>
  <p v-for="comment in this.postComments"><b>{{comment.comment}}</b>
    {{ }}<span><button type="button" class="btn btn-danger btn-sm" v-if="comment.owner == true"
        @click="this.commentDelete(comment);">Delete</button></span>
    <br /> Posted by {{comment.user.username}} &nbsp; <b>Score: </b>{{comment.score}}
  <div>
    <button id="button-link" @click="this.commentLike(comment);" v-if="comment.owner != true">Like</button>&nbsp;
    <button id="button-link" @click="this.commentDislike(comment);" v-if="comment.owner != true">Dislike</button>
  </div>
  </p>
  <p></p>
  <!-- Duplicate Workout -->
  <span>Like the workout and want to build off it? <button @click="copyWorkoutRoutines()" class="btn btn-primary">Click
      Here!</button>
  </span>
  <p></p>
  <a class="btn btn-secondary" href="/workouts">Return to Workouts</a>
</template>

<style>
#carousel {
  height: 500px;
  width: 500px;
  margin: auto;
}

#postCommentButton {
  margin-bottom: 100px;
}

#button-link {
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}

.carousel-caption {
  margin-bottom: -45px;
}

.exercise-name {
  margin-bottom: 420px;
}

.bottom-text {
  background-color: white;
}

body {
  margin-bottom: 50px;
}
</style>