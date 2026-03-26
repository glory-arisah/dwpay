<script setup></script>

<template>
	<div class="page--wrapper">
		<main class="card">
			<router-view />
		</main>
	</div>
</template>

<style scoped>
	.page--wrapper {
		background-color: var(--color-background);
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 0px;

		@media (min-width: 768px) {
			padding: 60px;
		}
	}

	.card {
		flex: 1;
		overflow-y: auto;
		background-color: white;
		min-height: 0;
		display: flex;
		flex-direction: column;
		border-radius: 0px;
		box-shadow: none;
		padding: 32px 24px 24px;

		@media (min-width: 768px) {
			border-radius: 12px;
			padding: 24px;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
		}
	}
</style>
