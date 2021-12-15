import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api"); // Movendo a api de "/" para "/api"
	app.enableCors(); // Habilitando o CORS
	await app.listen(process.env.PORT || 3000);
	console.info(`\nApplication is running on: ${await app.getUrl()}`);
}
bootstrap();
