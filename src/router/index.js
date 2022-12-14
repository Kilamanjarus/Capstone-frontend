import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import ExercisesView from "../views/ExercisesView.vue";
import WorkoutsView from "../views/WorkoutsView.vue";
import WorkoutsShow from "../views/WorkoutsShow.vue";
import WorkoutsEdit from "../views/WorkoutsEdit.vue";
import RoutineView from "../views/RoutineView.vue";



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExercisesView
  },
  {
    path: '/workouts',
    name: 'workouts',
    component: WorkoutsView
  },
  {
    path: '/workouts/:id',
    name: 'Workouts-show',
    component: WorkoutsShow
  },
  {
    path: '/workouts/:id/edit',
    name: 'workouts-edit',
    component: WorkoutsEdit
  },
  {
    path: '/routines',
    name: 'routines',
    component: RoutineView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
