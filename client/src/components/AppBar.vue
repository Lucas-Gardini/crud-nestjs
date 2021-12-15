<template>
	<v-app-bar density="compact">
		<v-img
			max-height="32"
			max-width="32"
			src="../assets/nestjs.svg"
		></v-img>
		<v-app-bar-title style="padding-left: 10px">
			<label>CRUD com NestJs</label>
		</v-app-bar-title>

		<v-spacer></v-spacer>

		<v-btn to="criar">Criar</v-btn>

		<v-btn class="mr-3" to="/">Listar</v-btn>

		<v-divider inset vertical></v-divider>

		<v-btn
			@click="redirectToGithub"
			class="mr-4 ml-5"
			color="#E0224E"
			text-color="#fff"
			plain
		>
			<v-icon left icon="mdi-github"></v-icon>

			<span>Git Hub</span>
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	methods: {
		redirectToGithub() {
			window.open("https://github.com/Lucas-Gardini", "_blank");
		},
	},
};
</script>

<style></style>
