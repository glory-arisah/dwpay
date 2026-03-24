<script setup lang="ts">
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'
	import { computed, ref } from 'vue'
	import { useRouter } from 'vue-router'

	const search = ref('')

	const filteredUserList = computed(() => {
		const query = search.value.toLowerCase().trim()

		return users.value.reduce((acc, user) => {
			const isNameMatched = user.name.trim().toLowerCase().includes(query)
			if (isNameMatched) acc.push(user)

			return acc
		}, [])
	})

	const router = useRouter()
	const userStore = useUserStore()
	const { users, isFetchingUsers, fetchUserError } = storeToRefs(userStore)

	function routeToCreateUser() {
		router.push({ name: 'create-user' })
	}

	const adminCount = computed(
		() => users.value.filter((user) => user.role === 'Admin').length,
	)

	// SYNC PINIA USERS STATE WITH LOCAL STORAGE
	userStore.loadFromStorage()
	// RUN GET /users
	userStore.fetchUsers()
</script>

<template>
	<div class="users-list">
		<div v-if="fetchUserError">{{ fetchUserError }}</div>

		<div>
			<div class="search">
				<input
					:disabled="isFetchingUsers"
					class="search--input"
					placeholder="Search..."
					v-model="search"
				/>
			</div>

			<div>
				<span>Total Admins:</span> <strong>{{ adminCount }}</strong>
			</div>

			<div class="create-user-cta">
				<button
					type="button"
					class="create-user--btn"
					@click="routeToCreateUser"
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
						v-for="user in filteredUserList"
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
