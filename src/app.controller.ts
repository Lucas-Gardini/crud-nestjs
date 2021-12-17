import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { IRoute } from "./main";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getAllRoutes(): Promise<IRoute[]> {
		return this.appService.getAllRoutes();
	}
}
