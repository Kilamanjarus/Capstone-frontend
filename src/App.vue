<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="isLoggedIn" to="/exercises">Exercises</router-link> <span v-if="isLoggedIn"> | </span>
    <router-link v-if="isLoggedIn" to="/routines">Current Routines</router-link> <span v-if="isLoggedIn"> | </span>
    <router-link v-if="isLoggedIn" to="/workouts">Workouts</router-link> <span v-if="isLoggedIn"> | </span>

    <router-link v-if="!isLoggedIn" to="/signup">Signup</router-link> <span v-if="!isLoggedIn"> | </span>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link> <span v-if="!isLoggedIn"></span>
    <router-link v-if="isLoggedIn" to="/logout">Logout</router-link> <span v-if="isLoggedIn"></span>
    <p v-if="isLoggedIn">Current User: {{ firstName }} {{lastName}}</p>
  </nav>
  <router-view />
  <p></p>
  <div>{{creditMessage}}</div>
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      firstName: localStorage.first_name,
      lastName: localStorage.last_name,
      creditMessage: "Exercise database, including equipment data, is all created by Justin Mozley and received through https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/",
    }
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt
      this.firstName = localStorage.first_name
      this.lastName = localStorage.last_name
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  margin-bottom: 0px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
