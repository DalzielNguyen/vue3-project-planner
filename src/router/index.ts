import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import AddProject from "@/views/AddProject.vue";
import ProjectForm from "@/components/ProjectForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-project',
    name: 'Add Project',
    component: AddProject
  },
  {
    path: '/edit-project/:id',
    name: 'Edit Project',
    component: ProjectForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
