<template>
  <nav>
    <router-link to="/">Home</router-link> |

    <router-link to="/signup">Signup</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/logout">Logout</router-link> |

    <router-link to="/exercises">Exercises</router-link> |
    <router-link to="/routines">Current Routines</router-link> |
    <router-link to="/workouts">Workouts</router-link> |
    <router-link to="/about">About</router-link> |
    <p v-if="isLoggedIn">Current User: {{ firstName }} {{lastName}}</p>
  </nav>
  <router-view />
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      firstName: localStorage.first_name,
      lastName: localStorage.last_name,
      email: localStorage.email,
      userId: localStorage.user_id,
    }
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt
      this.firstName = localStorage.first_name
      this.lastName = localStorage.last_name
      this.email = localStorage.email
      this.userId = localStorage.user_id
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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
