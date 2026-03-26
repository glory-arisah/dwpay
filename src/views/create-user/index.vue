<template>
	<div class="create-user--wrapper">
		<div class="create-user-header">
			<div style="display: flex; align-items: center; gap: 8px">
				<router-link
					:to="{ name: 'home' }"
					class="back--link"
					style="display: flex"
				>
					<img
						:src="backSvg"
						alt="go back to users register"
					/>
				</router-link>

				<span class="header-text"> Create User </span>
			</div>
		</div>

		<form
			id="create-user"
			class="create-user--form"
			@submit.prevent="submitNewUser"
		>
			<div class="user-form">
				<label
					for="name"
					class="form--label"
				>
					<div class="form-label-text">Name</div>

					<input
						type="text"
						id="name"
						class="form--input"
						placeholder="Enter"
						v-model="user.name"
						@input="validateForm"
					/>

					<p class="form-error">
						{{ formErrors?.name }}
					</p>
				</label>

				<label
					for="email"
					class="form--label"
				>
					<div class="form-label-text">Email</div>

					<input
						type="text"
						id="email"
						class="form--input"
						placeholder="Enter"
						v-model="user.email"
						@input="validateForm"
					/>

					<p class="form-error">
						{{ formErrors.email }}
					</p>
				</label>

				<label
					for="role"
					class="form--label"
				>
					<div class="form-label-text">Role</div>

					<div class="role-selector--wrapper">
						<select
							v-model="user.role"
							@change="validateForm"
							id="role"
							class="role--select"
						>
							<option
								selected
								:value="null"
							>
								Select
							</option>
							<option value="Admin">Admin</option>
							<option value="Editor">Editor</option>
							<option value="Viewer">Viewer</option>
						</select>

						<img
							:src="chevronDownSvg"
							alt="control dropdown"
							class="dropdown-chevron--icon"
						/>
					</div>

					<p class="form-error">
						{{ formErrors.role }}
					</p>
				</label>
			</div>
		</form>

		<div class="form-actions">
			<button
				type="button"
				class="cancel--btn"
				:disabled="isCreatingUser"
				@click="routeToUsersPage"
			>
				Cancel
			</button>

			<button
				form="create-user"
				class="submit--btn"
				:disabled="isCreatingUser"
			>
				Submit
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import chevronDownSvg from '@/assets/chevron-down.svg'
	import backSvg from '@/assets/back.svg'
	import { UserRole } from '@/services/userService'
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const userStore = useUserStore()

	const { isCreatingUser } = storeToRefs(userStore)

	interface User {
		name: string
		email: string
		role: UserRole | null
	}

	const user: User = reactive({
		name: '',
		email: '',
		role: null,
	})

	const formErrors = reactive({
		name: null,
		email: null,
		role: null,
	})

	function routeToUsersPage() {
		router.push({ name: 'users' })
	}

	function validateForm() {
		const { name, email, role } = user

		// VALIDATE NAME FIELD
		const hasName = name.trim().length > 0
		formErrors.name = !hasName ? 'Name is required' : null

		// VALIDATE EMAIL FIELD
		const emailValidityRegex =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		const isEmailValid = emailValidityRegex.test(email)
		const hasEmail = email.length > 0

		formErrors.email = !hasEmail
			? 'Email is required'
			: !isEmailValid
				? 'Email format is wrong'
				: null

		// VALIDATE ROLE
		const hasRole = role && role.length > 0
		formErrors.role = !hasRole ? 'User role is required' : null

		// RETURN TRUE IS ALL FIELDS ARE VALID (THERE ARE NO ERRORS)
		return Object.values(formErrors).every((error) => !error)
	}

	async function submitNewUser() {
		const isValid = validateForm()
		if (!isValid) return

		await userStore.addUser({ ...user })
		router.push({ name: 'home' })
	}
</script>

<style scoped>
	@import './index.css';
</style>
