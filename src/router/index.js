import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
				name: 'home',
				meta: {
					layout: 'main',
					auth: true
				},
			component: () => import('../views/Home.vue')
		},
		{
			path: '/auth',
			name: 'auth',
			meta: {
				layout: 'auth',
			},
			component: () => import('../views/Auth.vue')
		},
		{
			path: '/register',
			name: 'register',
			meta: {
				layout: 'auth',
			},
			component: () => import('../views/Register.vue')
		},
		{
			path: '/categories',
			name: 'categories',
			meta: {
				layout: 'main',
				auth: true
			},
			component: () => import('../views/Categories.vue')
		},
		{
			path: '/planning',
			name: 'planning',
			meta: {
				layout: 'main',
				auth: true
			},
			component: () => import('../views/Planning.vue')
		},
		{
			path: '/profile',
			name: 'profile',
			meta: {
				layout: 'main',
				auth: true
			},
			component: () => import('../views/Profile.vue')
		},
		{
			path: '/record',
			name: 'record',
			meta: {
				layout: 'main',
				auth: true
			},
			component: () => import('../views/Record.vue')
		},
		{
			path: '/detail/:id',
			name: 'detail',
			meta: {
				layout: 'main',
				auth: true
			},
			component: () => import('../views/DetailRecord.vue')
		},
		{
			path: '/history',
			name: 'history',
			meta: {
				layout: 'main',
				auth: true
			},
			component: () => import('../views/History.vue')
		},
	]
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser
	const requireAuth = to.matched.some(record => record.meta.auth)

	if (requireAuth && !currentUser) {
		next('/auth?message=login')
	} else {
		next()
	}
})

export default router
