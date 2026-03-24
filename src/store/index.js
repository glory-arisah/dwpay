import { STORAGE_KEY, createUser, getUsers } from '@/services/userService'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
	state: () => ({
		users: [],

		// GET /users loading and error states
		isFetchingUsers: false,
		fetchUserError: null,

		// POST /user loading and error states
		isCreatingUser: false,
		createUserError: null,
	}),
	actions: {
		loadFromStorage() {
			const usersInLocalStorage = localStorage.getItem(STORAGE_KEY)

			if (usersInLocalStorage) {
				this.users = JSON.parse(usersInLocalStorage)
			}
		},

		saveToStorage() {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
		},

		async fetchUsers(mockAPIFailure = false) {
			this.isFetchingUsers = true

			try {
				const response = await getUsers(mockAPIFailure)

				// LOAD USERS FROM API IF PINIA STORE USERS IS EMPTY
				// THIS IS MEANT TO SYNC THE STORE AND LOCAL STORAGE
				if (this.users.length === 0) {
					this.users = response.data
					this.saveToStorage()
				}
			} catch (error) {
				this.fetchUserError = error.message
			} finally {
				this.isFetchingUsers = false
			}
		},
		async addUser(user, mockAPIFailure) {
			this.isCreatingUser = true

			try {
				const response = await createUser(user, mockAPIFailure)
				this.users.push(response.data)
				this.saveToStorage()
			} catch (error) {
				this.createUserError = error.message
			} finally {
				this.isCreatingUser = false
			}
		},
	},
})
