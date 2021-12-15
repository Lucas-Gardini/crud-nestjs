import { createRouter, createWebHistory } from "vue-router";
import Listar from "../views/Listar.vue";
import Criar from "../views/Criar.vue";

const routes = [
	{
		path: "/",
		name: "Listar",
		component: Listar,
	},
	{
		path: "/criar",
		name: "Criar",
		component: Criar,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
