import { useMutation } from "@apollo/client";
import { UPDATE_DRIVER } from "@/graphql/mutations/driverMutations";
import { GET_DRIVER_BY_ID } from "@/graphql/queries/driverQueries";
import { UpdateDriverInput } from "@/utils/interfaces/inputs/UpdateDriverInput";
import { Driver } from "@/utils/interfaces/Driver";

interface UpdateDriverData {
	updateDriver: Driver;
}

interface UpdateDriverVars {
	id: string;
	input: UpdateDriverInput;
}

export const useUpdateDriver = (driverId: string) => {
	const [updateDriver, { data, loading, error }] = useMutation<
		UpdateDriverData,
		UpdateDriverVars
	>(UPDATE_DRIVER, {
		refetchQueries: [
			"GetDrivers",
			{ query: GET_DRIVER_BY_ID, variables: { id: driverId } },
		],
		awaitRefetchQueries: false,
	});

	return {
		updateDriver,
		data: data?.updateDriver,
		loading,
		error,
	};
};
