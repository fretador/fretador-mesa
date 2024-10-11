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
			dispatch(fetchDriversStart());
			try {
				const response = await DriverService.getDrivers(page, limit, filter);
				const pageInfo: PageInfo = DriverService.transformPageInfo(
					response.pageInfo
				);
				dispatch(fetchDriversSuccess({ drivers: response.data, pageInfo }));
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error ? error.message : "An unknown error occurred";
				console.error("Error loading drivers:", errorMessage);
				dispatch(fetchDriversFailure(errorMessage));
			}
		},
		[dispatch]
	);

	const loadDriverById = useCallback(async (id: string) => {
		try {
			const driver = await DriverService.getDriverById(id);
			return driver;
		} catch (error) {
			console.error("Error loading driver by ID:", error);
			throw error;
		}
	}, []);

	return {
		loadDrivers,
		loadDriverById,
	};
};
