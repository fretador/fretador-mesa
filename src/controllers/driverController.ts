import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
	fetchDriversStart,
	fetchDriversSuccess,
	fetchDriversFailure,
} from "@/store/slices/driverSlice";
import { DriverService } from "@/services/driverService";
import { Driver } from "@/utils/types/Driver";
import { PageInfo } from "@/utils/types/PageInfo";
import { DriverFilters } from "@/utils/types/DriverFilters";

export const useDriverController = () => {
	const dispatch = useDispatch();

	const loadDrivers = useCallback(
		async (page: number, limit: number, filter: DriverFilters) => {
			const status = filter.status ?? [];
			dispatch(fetchDriversStart({ status }));

			try {
				const response = await DriverService.getDrivers(page, limit, filter);
				const transformedDrivers: Driver[] = DriverService.transformDrivers(
					response.data
				);
				const pageInfo: PageInfo = DriverService.transformPageInfo(
					response.pageInfo
				);
				dispatch(
					fetchDriversSuccess({ drivers: transformedDrivers, pageInfo, status })
				);
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error ? error.message : "An unknown error occurred";
				console.error("Error loading drivers:", errorMessage);
				dispatch(fetchDriversFailure({ error: errorMessage, status }));
			}
		},
		[dispatch]
	);

	return {
		loadDrivers,
	};
};
