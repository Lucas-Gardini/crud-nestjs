import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Endereco } from "./schemas/endereco.schema";

interface IEndereco {
	uf: string;
	cidade: string;
	bairro: string;
	rua: string;
	numero: number;
	cep: string;
}

@Injectable()
export class EnderecosService {
	constructor(
		@InjectModel(Endereco.name)
		private readonly enderecoModel: Model<Endereco>,
	) {}

	async getAll() {
		return await this.enderecoModel.find().exec();
	}

	async getById(id: string) {
		return await this.enderecoModel.findById(id).exec();
	}

	async create({ uf, cidade, bairro, rua, numero, cep }: IEndereco) {
		const alreadyRegistered = await this.enderecoModel.findOne({
			cep,
			numero,
		});

		if (alreadyRegistered) {
			return alreadyRegistered;
		}

		return await this.enderecoModel.create({
			uf,
			cidade,
			bairro,
			rua,
			numero,
			cep,
		});
	}

	async update(id: string, endereco: Endereco) {
		await this.enderecoModel.updateOne({ _id: id }, endereco).exec();
		return this.getById(id);
	}

	async delete(id: string) {
		return await this.enderecoModel.deleteOne({ _id: id }).exec();
	}
}
