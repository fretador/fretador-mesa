import apolloClient from "@/app/apolloClient";
import { GET_DRIVERS_QUERY, GET_DRIVER_BY_ID } from "@/graphql/queries/driverQueries";
import { Driver } from "@/utils/types/Driver";
import { PageInfo } from "@/utils/types/PageInfo";
import { GetDriversResponse } from "@/utils/types/GetDriversResponse";
import { DriverFilters } from "@/utils/types/DriverFilters";
import { DriverNode } from "@/utils/types/DriverNode";

export const DriverService = {
	getDrivers: async (page: number, limit: number, filter: DriverFilters) => {
		const response = await apolloClient.query<{ drivers: GetDriversResponse }>({
			query: GET_DRIVERS_QUERY,
			variables: { page, limit, filter },
		});

		if (!response.data || !response.data.drivers) {
			throw new Error("Failed to fetch drivers");
		}

		return {
			data: response.data.drivers.edges.map((edge: DriverNode) => edge.node),
			pageInfo: response.data.drivers.pageInfo,
		};
	},

	getDriverById: async (id: string) => {
		const response = await apolloClient.query<{ driver: Driver }>({
			query: GET_DRIVER_BY_ID,
			variables: { id },
		});

		if (!response.data || !response.data.driver) {
			throw new Error("Failed to fetch driver by ID");
		}

		return response.data.driver;
	},

	transformDrivers: (data: Driver[]) => {
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
