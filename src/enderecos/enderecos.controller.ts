import {
	Controller,
	Get,
	Body,
	Post,
	Put,
	Param,
	Delete,
} from "@nestjs/common";
import { EnderecosService } from "./enderecos.service";
import { Endereco } from "./schemas/endereco.schema";

@Controller("enderecos")
export class EnderecosController {
	constructor(private enderecosService: EnderecosService) {}

	@Get()
	async getAll(): Promise<Endereco[]> {
		return this.enderecosService.getAll();
	}

	@Get("/:id")
	async getById(@Param("id") id: string): Promise<Endereco> {
		return this.enderecosService.getById(id);
	}

	@Post()
	async create(@Body() endereco: Endereco): Promise<Endereco> {
		return this.enderecosService.create(endereco);
	}

	@Put("/:id")
	async update(
		@Param("id") id: string,
		@Body() pessoa: Endereco,
	): Promise<Endereco> {
		return this.enderecosService.update(id, pessoa);
	}

	@Delete("/:id")
	async delete(@Param("id") id: string): Promise<any> {
		return this.enderecosService.delete(id);
	}
}
