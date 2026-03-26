<script setup lang="ts">
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'
	import { computed, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import plusSvg from '@/assets/plus.svg'
	import searchSvg from '@/assets/search.svg'
	import clearSvg from '@/assets/clear.svg'

	const search = ref('')

	const filteredUserList = computed(() => {
		if (!hasUsers.value) return []

		const query = search.value.toLowerCase().trim()

		return users.value.reduce((acc, user) => {
			const isNameMatched = user.name.trim().toLowerCase().includes(query)
			if (isNameMatched) acc.push(user)

			return acc
		}, [])
	})

	const router = useRouter()
	const userStore = useUserStore()
	const { users, isFetchingUsers, fetchUserError, hasUsers } =
		storeToRefs(userStore)

	function routeToCreateUser() {
		router.push({ name: 'create-user' })
	}

	const showClearButton = computed(() => search.value.trim().length > 0)

	function clearSearch() {
		search.value = ''
	}

	const adminCount = computed(() =>
		hasUsers.value
			? users.value.filter((user) => user.role === 'Admin').length
			: 0,
	)

	// SYNC PINIA USERS STATE WITH LOCAL STORAGE
	userStore.loadFromStorage()
	// RUN GET /users
	userStore.fetchUsers()
</script>

<template>
	<div class="users-list">
		<header class="users-header">
			<div
				style="
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 16px;
				"
			>
				<div class="header-text">Users</div>

				<button
					type="button"
					class="add-user--btn"
					@click="routeToCreateUser"
				>
					<img :src="plusSvg" />
					<span> New User </span>
				</button>
			</div>

			<!-- SEARCH -->
			<div class="search">
				<input
					:disabled="isFetchingUsers || !hasUsers"
					class="search--input"
					placeholder="Search..."
					v-model="search"
				/>

				<img
					:src="searchSvg"
					alt="Search for user"
					class="search-icon"
				/>

				<button
					v-if="showClearButton"
					type="button"
					class="clear-icon--btn"
					@click="clearSearch"
				>
					<img
						:src="clearSvg"
						alt="clear search input"
					/>
				</button>
			</div>

			<div
				v-if="!isFetchingUsers"
				class="total-admins-count"
			>
				<span>Total Admins:</span> <strong>{{ adminCount }}</strong>
			</div>
		</header>

		<div v-if="fetchUserError">{{ fetchUserError }}</div>

		<div style="flex: 1; overflow-y: auto">
			<div
				v-if="isFetchingUsers"
				class="loader"
			>
				Loading users....
			</div>

			<div
				v-else-if="!hasUsers"
				class="no-users--wrapper"
			>
				<h4 class="no-users--header">There are no users at this moment.</h4>
				<p class="no-users--prompt">
					To view your users, start by creating a new user
				</p>
			</div>

			<div
				v-else-if="filteredUserList.length === 0"
				class="no-users--wrapper"
			>
				<h4 class="no-users--header">No results found.</h4>
				<p class="no-users--prompt">
					Try adjusting your search or checking for typos.
				</p>
			</div>

			<table
				v-else
				class="users-table"
			>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="(user, userIndex) in filteredUserList"
						:key="user.id"
					>
						<td data-label="#">
							{{ (userIndex as number) + 1 }}
						</td>
						<td data-label="Name">{{ user.name }}</td>
						<td data-label="Email">{{ user.email }}</td>
						<td data-label="Role">
							<span :class="['role', user.role.toLowerCase()]">{{
								user.role
							}}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
	@import './index.css';
</style>
