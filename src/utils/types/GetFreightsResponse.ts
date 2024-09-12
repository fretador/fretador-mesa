import { FreightNode } from "./FreightNode";
import { PageInfo } from "./PageInfo";

export interface GetFreightsResponse {
	edges: FreightNode[];
	pageInfo: PageInfo;
	freights: {
		edges: FreightNode[];
		pageInfo: PageInfo;
	};
}
