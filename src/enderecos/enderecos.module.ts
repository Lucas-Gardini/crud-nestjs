import { Module } from "@nestjs/common";
import { EnderecosService } from "./enderecos.service";
import { EnderecosController } from "./enderecos.controller";
import { Endereco, EnderecoSchema } from "./schemas/endereco.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Endereco.name, schema: EnderecoSchema },
		]),
	],
	providers: [EnderecosService],
	controllers: [EnderecosController],
})
export class EnderecosModule {}
