import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Endereco } from "../../enderecos/schemas/endereco.schema";

export type PessoaDocument = Pessoa & Document;

@Schema()
export class Pessoa extends Document {
	@Prop()
	nome: string;

	@Prop({
		validate: {
			validator: function (cpf: string) {
				return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf);
			},
		},
		unique: true,
	})
	cpf: string;

	@Prop()
	data_nascimento: Date;

	@Prop()
	ativo: boolean;

	@Prop({
		type: [{ type: MongooseSchema.Types.ObjectId, ref: Endereco.name }],
		required: false,
	})
	enderecos: [Endereco];
}

export const PessoaSchema = SchemaFactory.createForClass(Pessoa);
