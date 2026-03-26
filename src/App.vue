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
		align-items: center;
		flex-direction: column;
		overflow: hidden;
		padding: 0px;

		@media (min-width: 768px) {
			padding: 60px;
		}
	}

	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 772px;
		flex: 1;
		background-color: white;
		overflow-y: auto;
		min-height: 0;
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
