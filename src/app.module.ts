import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config"; // Usando arquivo "".env"
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static"; // Servindo arquivos estáticos pro front
import { join } from "path";
import { PessoasModule } from "./pessoas/pessoas.module";
import { EnderecosModule } from "./enderecos/enderecos.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.DATABASE_URL),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "client/dist"),
		}),
		PessoasModule,
		EnderecosModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
