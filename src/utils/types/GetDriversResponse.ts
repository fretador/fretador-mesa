import { DriverNode } from "./DriverNode";
import { PageInfo } from "./PageInfo";

export interface GetDriversResponse {
	edges: any;
	pageInfo: any;
	freights: {
		edges: DriverNode[];
		pageInfo: PageInfo;
	};
}
