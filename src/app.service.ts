import { Injectable } from "@nestjs/common";
import { routes, IRoute } from "./main";

@Injectable()
export class AppService {
	async getAllRoutes(): Promise<IRoute[]> {
		return routes;
	}
}
