<template>
	<v-card
		style="
			display: flex;
			flex-direction: column;
			width: 80%;
			margin: auto;
			margin-top: 5%;
		"
	>
		<table>
			<thead>
				<th>Nome</th>
				<th>CPF</th>
				<th>Data de Nascimento</th>
				<th>Ativo</th>
			</thead>
			<tbody>
				<tr v-for="(pessoa, i) in pessoas" :key="i">
					<td>{{ pessoa.nome }}</td>
					<td>{{ pessoa.cpf }}</td>
					<td>
						{{ arrumarData(pessoa.data_nascimento) }}
					</td>
					<td>{{ pessoa.ativo ? "SIM" : "NÃO" }}</td>
					<td>
						<v-btn
							text-color="#E0224E"
							icon="mdi-delete"
							flat=""
							@click="deletar(pessoa._id)"
						></v-btn>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="text-center">
			<v-pagination
				v-model="pagina"
				:length="total_paginas"
			></v-pagination>
		</div>

		<!-- ERRO -->
		<v-dialog v-model="error" width="500">
			<v-card>
				<v-card-title class="text-h5 grey lighten-2">
					Erro ao carregar usuários
				</v-card-title>

				<v-card-text>
					{{ error_message }}
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" variant="text" @click="getUsers">
						Tentar novamente
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import axios from "axios";
export default {
	name: "Listar",
	components: {},
	data() {
		return {
			pessoas: [],
			error: false,
			error_message: "",
			pagina: 1,
			total_paginas: 0,
		};
	},
	watch: {
		pagina() {
			this.getUsers();
		},
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		async getUsers() {
			try {
				this.pessoas = (
					await axios.get(
						`${this.$baseURL}/pessoas?pagina=${this.pagina}`,
					)
				).data;
				this.total_paginas = (
					await axios.get(`${this.$baseURL}/pessoas/paginas`)
				).data;
			} catch (error) {
				this.error = true;
				this.error_message = error.message;
			}
		},
		async deletar(id) {
			try {
				this.pessoas = (
					await axios.delete(`${this.$baseURL}/pessoas/${id}`)
				).data;
			} catch (error) {
				this.error = true;
				this.error_message = error.message;
			}

			this.getUsers();
		},
		arrumarData(data) {
			try {
				let data_arrumada = data.split("-");
				return (
					data_arrumada[2].split("T")[0] +
					"/" +
					data_arrumada[1] +
					"/" +
					data_arrumada[0]
				);
			} catch (error) {
				return;
			}
		},
	},
};
</script>

<style>
table {
	width: 95%;
	margin: auto;
}

table tbody {
	width: 100%;
}
</style>
