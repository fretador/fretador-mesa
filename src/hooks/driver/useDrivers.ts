import { useQuery } from "@apollo/client";
import { GET_DRIVERS_QUERY } from "@/graphql/queries/driverQueries";
import { Driver } from "@/utils/Interfaces/Driver";
import { DriverFilters } from "@/utils/Interfaces/DriverFilters";

interface GetDriversData {
	drivers: {
		edges: {
			node: Driver;
		}[];
		pageInfo: {
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			currentPage: number;
			totalPages: number;
		};
	};
}

interface GetDriversVars {
	page?: number;
	limit?: number;
	filter?: DriverFilters;
}

export const useDrivers = (vars: GetDriversVars) => {
	const { data, loading, error, refetch } = useQuery<
		GetDriversData,
		GetDriversVars
	>(GET_DRIVERS_QUERY, {
		variables: vars,
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.drivers,
		loading,
		error,
		refetch,
	};
};
