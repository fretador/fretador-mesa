import {
	GET_FREIGHTS,
	GET_FREIGHT_BY_ID,
} from "@/graphql/queries/freightQueries";
import apolloClient from "@/app/apolloClient";
import { Freight } from "../utils/types/Freight";
import { PageInfo } from "../utils/types/PageInfo";
import { FreightFilters } from "@/utils/types/FreightFilters";
import { GetFreightsResponse } from "../utils/types/GetFreightsResponse";
import { FreightNode } from "@/utils/types/FreightNode";

export const FreightService = {
	getFreights: async (filters: FreightFilters, page: number, limit: number) => {
		const response = await apolloClient.query<{ freights: GetFreightsResponse }>({
			query: GET_FREIGHTS,
			variables: { page, limit, filter: filters },
		});

		return {
			data: response.data.freights.edges.map((edge: FreightNode) => edge.node),
			pageInfo: response.data.freights.pageInfo,
		};
	},

	getFreightById: async (id: string) => {
		const response = await apolloClient.query<{ freight: Freight }>({
			query: GET_FREIGHT_BY_ID,
			variables: { id },
		});

		return response.data.freight;
	},

	transformFreights: (data: Freight[]) => {
		return data;
	},

	transformPageInfo: (pageInfo: PageInfo) => {
		return {
			hasNextPage: pageInfo.hasNextPage,
			hasPreviousPage: pageInfo.hasPreviousPage,
			currentPage: pageInfo.currentPage,
			totalPages: pageInfo.totalPages,
		};
	},
};
