export const STORAGE_KEY = 'users'

export interface APIResponse<T> {
	data: T
}

export interface APIError {
	message: string
}

export type UserRole = 'Admin' | 'Editor' | 'Viewer'

export interface User {
	id: string | number
	name: string
	email: string
	role: UserRole
}

let users: User[] = []

function initializeSampleUsers() {
	const localStorageUsers = JSON.parse(localStorage.getItem(STORAGE_KEY))

	if (!localStorageUsers) {
		const sampleUsers = [
			{
				id: Date.now(),
				name: 'John Doe',
				email: 'john@example.com',
				role: 'Admin',
			},
		]

		localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleUsers))
	}

	users = JSON.parse(localStorage.getItem(STORAGE_KEY))
}

initializeSampleUsers()

export async function getUsers(
	mockAPIFailure: boolean = false,
): Promise<APIResponse<User[]>> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!mockAPIFailure) {
				resolve({ data: users })
				return
			}

			reject({ message: 'Error fetching users' })
		}, 600)
	})
}

type NewUser = Omit<User, 'id'>

export async function createUser(
	newUser: NewUser,
	mockAPIFailure: boolean,
): Promise<APIResponse<User>> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = { id: Date.now(), ...newUser }
			users.push(user)

			if (!mockAPIFailure) {
				resolve({ data: user })
				return
			}

			reject({ message: 'Error creating user' })
		}, 600)
	})
}
