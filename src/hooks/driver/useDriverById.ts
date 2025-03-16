import { useQuery } from "@apollo/client";
import { GET_DRIVER_BY_ID } from "@/graphql/queries/driverQueries";
import { Driver } from "@/utils/interfaces/Driver";

interface GetDriverByIdData {
	driver: Driver;
}

interface GetDriverByIdVars {
	id: string;
}

export const useDriverById = (driverId: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetDriverByIdData,
		GetDriverByIdVars
	>(GET_DRIVER_BY_ID, {
		variables: { id: driverId },
		skip: !driverId,
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.driver,
		loading,
		error,
		refetch,
	};
};
