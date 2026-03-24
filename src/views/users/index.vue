<script setup lang="ts">
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'

	const userStore = useUserStore()
	const { users, isFetchingUsers, fetchUserError } = storeToRefs(userStore)

	// SYNC PINIA USERS STATE WITH LOCAL STORAGE
	userStore.loadFromStorage()
	// RUN GET /users
	userStore.fetchUsers()
</script>

<template>
	<div class="users-list">
		<div v-if="fetchUserError">{{ fetchUserError }}</div>

		<div>
			<div class="create-user-cta">
				<button
					type="button"
					class="create-user--btn"
				>
					Create user
				</button>
			</div>

			<div
				v-if="isFetchingUsers"
				class="loader"
			>
				Loading....
			</div>

			<table
				v-else
				class="users-table"
			>
				<thead>
					<tr>
						<td>Name</td>
						<td>Email</td>
						<td>Role</td>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="user in users"
						:key="user.id"
					>
						<td>{{ user.name }}</td>
						<td>{{ user.email }}</td>
						<td>{{ user.role }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
	@import './index.css';
</style>
