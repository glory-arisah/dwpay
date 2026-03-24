<script setup>
	import { ref } from 'vue'

	const expandMobileMenu = ref(false)
	const currentYear = new Date().getFullYear()
</script>

<template>
	<div id="app">
		<nav class="fixed-nav-bar">
			<ul>
				<li>
					<router-link :to="{ name: 'home' }">Home</router-link>
				</li>
			</ul>
		</nav>

		<div
			:class="['mobile-menu', expandMobileMenu ? 'open' : '']"
			id="mobileMenu"
		></div>

		<main class="content--wrapper">
			<div class="main-content">
				<router-view />
			</div>
		</main>

		<footer class="footer">
			<div class="footer-content">DWPy {{ currentYear }} Company Inc.</div>
		</footer>
	</div>
</template>

<style scoped>
	#app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* NAV BAR STYLE */
	.fixed-nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: 24px 30px;
		border-bottom: 1px solid #e5e7eb;
		display: flex;
		justify-content: end;

		@media (min-width: 576px) {
			padding: 24px 56px;
		}
	}

	.fixed-nav-bar ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: end;

		@media (min-width: 576px) {
			max-width: 600px;
		}
	}

	.fixed-nav-bar li a {
		text-decoration: none;
		padding: 0px 20px;
		display: none;

		@media (min-width: 576px) {
			display: block;
		}
	}

	/* MAIN CONTENT STYLES */
	.content--wrapper {
		display: flex;
		justify-content: center;
		flex: 1;
		overflow-y: auto;
		margin-top: 96px;
	}

	.main-content {
		width: 100%;
		max-width: 600px;
	}

	/* FOOTER STYLES */
	.footer {
		display: flex;
		border-top: 1px solid #e5e7eb;

		@media (min-width: 772) {
			justify-content: center;
		}

		.footer-content {
			padding: 24px 30px;

			@media (min-width: 576px) {
				max-width: 600px;
				padding: 24px 56px;
			}

			@media (min-width: 772px) {
				display: flex;
				justify-content: center;
				max-width: 600px;
				padding: 24px 120px;
			}
		}
	}
</style>
