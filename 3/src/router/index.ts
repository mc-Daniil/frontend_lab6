import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: () => import('../views/TaskListView.vue')
    },
    {
      path: '/add',
      name: 'add-task',
      component: () => import('../views/AddTaskView.vue')
    },
    {
      path: '/task/:id(\\d+)',
      name: 'task-details',
      component: () => import('../views/TaskDetailsView.vue'),
      props: true
    },
    {
      path: '/task/:id(\\d+)/delete',
      name: 'task-delete',
      component: () => import('../views/DeleteTaskView.vue'),
      props: true
    },
    {
      path: '/task/:id(\\d+)/complete',
      name: 'task-complete',
      component: () => import('../views/CompleteTaskView.vue'),
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router