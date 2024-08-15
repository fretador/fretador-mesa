import { FreightNode } from "./FreightNode";
import { PageInfo } from "./PageInfo";

export interface GetFreightsResponse {
	edges: any;
	pageInfo: any;
	freights: {
		edges: FreightNode[];
		pageInfo: PageInfo;
	};
}
