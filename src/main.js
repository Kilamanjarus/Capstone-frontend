import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// Register the package

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

createApp(App).use(router).mount('#app')
// createApp(App).use(VueAwesomePaginate).mount("#app");
