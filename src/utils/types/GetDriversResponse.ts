import { DriverNode } from "./DriverNode";
import { PageInfo } from "./PageInfo";

export interface GetDriversResponse {
	edges: DriverNode[];
	pageInfo: PageInfo;
	freights: {
		edges: DriverNode[];
		pageInfo: PageInfo;
	};
}
