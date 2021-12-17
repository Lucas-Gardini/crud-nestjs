import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export interface IRoute {
	path: string;
	methods: object;
}

let routes: IRoute[];

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api"); // Movendo a api de "/" para "/api"
	app.enableCors(); // Habilitando o CORS
	await app.listen(process.env.PORT || 3000);

	const server = app.getHttpServer();
	const router = server._events.request._router;
	routes = router.stack.map((layer) => {
		if (layer.regexp.toString().includes("api")) {
			return {
				path: layer.route.path,
				methods: layer.route.methods,
			};
		}
	});

	routes = routes.filter((route) => route !== undefined);

	console.info(`\nApplication is running on: ${await app.getUrl()}`);
}
bootstrap();

export { routes };
