import { useDispatch } from "react-redux";
import {
	fetchFreightsStart,
	fetchFreightsSuccess,
	fetchFreightsFailure,
} from "@/store/slices/freightSlice";
import { FreightService } from "@/services/freightService";
import { Freight } from "@/utils/types/Freight";
import { PageInfo } from "@/utils/types/PageInfo";
import { FreightFilters } from "@/utils/types/FreightFilters";

export const useFreightController = () => {
	const dispatch = useDispatch();

	const loadFreights = async (
		filters: FreightFilters,
		page: number,
		limit: number
	) => {
		dispatch(fetchFreightsStart());
		try {
			const response = await FreightService.getFreights(filters, page, limit);
			console.log("Response from service:", response);

			const transformedFreights: Freight[] = FreightService.transformFreights(
				response.data
			);
			console.log("Transformed Freights:", transformedFreights);

			const pageInfo: PageInfo = FreightService.transformPageInfo(
				response.pageInfo
			);
			console.log("Page Info:", pageInfo);

			dispatch(fetchFreightsSuccess({ freights: transformedFreights, pageInfo }));
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			console.error("Error loading freights:", errorMessage);
			dispatch(fetchFreightsFailure(errorMessage));
		}
	};

	const loadFreightById = async (id: string) => {
		try {
			const freight = await FreightService.getFreightById(id);
			return freight;
		} catch (error) {
			console.error("Error loading freight by ID:", error);
			throw error;
		}
	};

	return {
		loadFreights,
		loadFreightById,
	};
};
