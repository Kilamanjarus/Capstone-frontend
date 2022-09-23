<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("email");
    this.$router.push("/");
  },
};
</script>
  
<template>
  <div class="logout"></div>
</template>