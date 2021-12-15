<template>
	<v-card class="form" elevation="2" outlined tile>
		<v-card-header> Formulário de Usuário </v-card-header>
		<div class="content">
			<v-form ref="form" v-model="valid" lazy-validation>
				<!-- NOME & CPF -->
				<div class="flex">
					<v-text-field
						v-model="nome"
						label="Nome"
						required
						color="#E0224E"
						:error="nome_invalid"
					></v-text-field>
					<v-spacer style="flex-grow: 0.1 !important" />
					<v-text-field
						v-model="CPF"
						label="CPF"
						required
						color="#E0224E"
						:error="CPF_invalid"
						v-maska="'###.###.###-##'"
					></v-text-field>
				</div>

				<!-- NASCIMENTO -->
				<div class="flex">
					<v-text-field
						type="date"
						v-model="data_nascimento"
						label="Data de Nascimento"
						required
						color="#E0224E"
					></v-text-field>
				</div>

				<!-- ATIVO -->
				<v-checkbox
					v-model="ativo"
					label="Usuário Ativo?"
					required
					color="#E0224E"
				></v-checkbox>

				<v-btn color="error" class="mr-4" @click="limpar">
					Limpar
				</v-btn>

				<v-btn
					:disabled="!valid"
					color="success"
					class="mr-4"
					@click="validate"
				>
					Enviar
				</v-btn>
			</v-form>
		</div>
		<v-card-actions></v-card-actions>
	</v-card>
</template>

<script>
import axios from "axios";

export default {
	data: () => ({
		valid: true,
		nome_invalid: false,
		CPF_invalid: false,
		nome: "",
		CPF: "",
		data_nascimento: null,
		ativo: false,
	}),

	methods: {
		validate() {
			if (!(this.nome && this.nome.length > 0))
				return (this.nome_invalid = true);

			if (
				!(this.CPF && this.CPF.length > 0) &&
				!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.CPF)
			)
				return (this.CPF_invalid = true);

			this.enviar();
		},
		async enviar() {
			try {
				const result = await axios.post(`${this.$baseURL}/pessoas`, {
					nome: this.nome,
					cpf: this.CPF,
					data_nascimento: this.data_nascimento,
					ativo: this.ativo,
				});

				if (result.status === 201) {
					this.$router.push("/");
				}
			} catch (error) {
				console.log(error);
			}
		},
		limpar() {
			this.nome = "";
			this.CPF = "";
			this.data_nascimento = null;
		},
	},
};
</script>

<style scoped>
.form {
	width: 80%;
	margin: auto;
	margin-top: 5%;
}
.form .content {
	margin: 25px;
}

.form .content .flex {
	display: flex;
	justify-content: space-between;
}
</style>
