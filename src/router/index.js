import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'home',
			path: '/',
			redirect: '/users',
		},
		{
			name: 'users',
			path: '/users',
			component: () => import('@/views/users/index.vue'),
		},
	],
})
