import { GET_FREIGHTS_FOR_FINANCIAL, GET_FREIGHT_FINANCIAL_BY_ID } from "@/graphql/queries/financialQueries";
import apolloClient from "@/app/apolloClient";
import { Freight } from "../utils/types/Freight";
import { PageInfo } from "../utils/types/PageInfo";
import { FinancialFilterInput } from "@/utils/types/FinancialFilterInput";
import { GetFreightsResponse } from "../utils/types/GetFreightsResponse";
import { FreightNode } from "@/utils/types/FreightNode";

export const FinancialService = {
	getFreightsForFinancial: async (
		filters: FinancialFilterInput,
		page: number,
		limit: number
	) => {
		const response = await apolloClient.query<{
			freightsForFinancial: GetFreightsResponse;
		}>({
			query: GET_FREIGHTS_FOR_FINANCIAL,
			variables: { page, limit, filter: filters },
		});

		if (!response.data || !response.data.freightsForFinancial) {
			throw new Error("Failed to fetch freights for financial");
		}

		return {
			data: response.data.freightsForFinancial.edges.map(
				(edge: FreightNode) => edge.node
			),
			pageInfo: response.data.freightsForFinancial.pageInfo,
		};
	},

	getFreightForFinancialById: async (id: string) => {
		const response = await apolloClient.query({
			query: GET_FREIGHT_FINANCIAL_BY_ID,
			variables: { id },
		});

		if (!response.data || !response.data.freightForFinancialById) {
			throw new Error("Failed to fetch freight for financial by id");
		}

		return response.data.freightForFinancialById;
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
