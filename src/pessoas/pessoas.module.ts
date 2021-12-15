import { Module } from "@nestjs/common";
import { PessoasService } from "./pessoas.service";
import { PessoasController } from "./pessoas.controller";
import { Pessoa, PessoaSchema } from "./schemas/pessoa.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Pessoa.name, schema: PessoaSchema },
		]),
	],
	providers: [PessoasService],
	controllers: [PessoasController],
})
export class PessoasModule {}
