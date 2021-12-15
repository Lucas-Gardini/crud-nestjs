import {
	Controller,
	Get,
	Param,
	Body,
	Post,
	Put,
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

	@Post()
	async create(@Body() endereco: Endereco): Promise<Endereco> {
		return this.enderecosService.create(endereco);
	}
}
