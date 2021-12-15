import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EnderecoDocument = Endereco & Document;

@Schema()
export class Endereco {
	@Prop()
	uf: string;

	@Prop()
	cidade: string;

	@Prop()
	bairro: string;

	@Prop()
	rua: string;

	@Prop()
	numero: number;

	@Prop()
	cep: string;
}

export const EnderecoSchema = SchemaFactory.createForClass(Endereco);
