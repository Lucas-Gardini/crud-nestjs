import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pessoa } from "./schemas/pessoa.schema";

export interface IPessoa {
	nome: string;
	cpf: string;
	data_nascimento: Date;
	ativo: boolean;
}

@Injectable()
export class PessoasService {
	constructor(
		@InjectModel(Pessoa.name) private readonly pessoaModel: Model<Pessoa>,
	) {}

	async getAll(pagina: number) {
		const limit = 5;
		const skip = (pagina - 1) * limit;

		return await this.pessoaModel
			.find({}, {}, { skip, limit })
			.populate("enderecos")
			.exec();
	}

	async getAllPages() {
		const count = await this.pessoaModel.countDocuments();
		const pages = Math.ceil(count / 5);
		return pages;
	}

	async getById(id: string) {
		return await this.pessoaModel.findById(id).exec();
	}

	async create({ nome, cpf, data_nascimento, ativo }: IPessoa) {
		return await this.pessoaModel.create({
			nome,
			cpf,
			data_nascimento,
			ativo,
		});
	}

	async update(id: string, pessoa: Pessoa) {
		await this.pessoaModel.updateOne({ _id: id }, pessoa).exec();
		return this.getById(id);
	}

	async delete(id: string) {
		return await this.pessoaModel.deleteOne({ _id: id }).exec();
	}
}
