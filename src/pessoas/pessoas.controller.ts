import {
	Controller,
	Get,
	Param,
	Body,
	Post,
	Put,
	Delete,
	Query,
} from "@nestjs/common";
import { PessoasService, IPessoa } from "./pessoas.service";
import { Pessoa } from "./schemas/pessoa.schema";

@Controller("pessoas")
export class PessoasController {
	constructor(private pessoasService: PessoasService) {}

	@Get()
	async getAll(@Query("pagina") pagina: string): Promise<Pessoa[]> {
		return this.pessoasService.getAll(pagina ? Number(pagina) : 1);
	}

	@Get("/paginas")
	async getAllPages(): Promise<number> {
		return this.pessoasService.getAllPages();
	}

	@Get("/:id")
	async getById(@Param("id") id: string): Promise<Pessoa> {
		return this.pessoasService.getById(id);
	}

	@Post()
	async create(@Body() pessoa: IPessoa): Promise<Pessoa> {
		pessoa = {
			...pessoa,
			data_nascimento: new Date(pessoa.data_nascimento),
		};
		return this.pessoasService.create(pessoa);
	}

	@Put("/:id")
	async update(
		@Param("id") id: string,
		@Body() pessoa: Pessoa,
	): Promise<Pessoa> {
		return this.pessoasService.update(id, pessoa);
	}

	@Delete("/:id")
	async delete(@Param("id") id: string): Promise<any> {
		return this.pessoasService.delete(id);
	}
}
