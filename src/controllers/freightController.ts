import { useDispatch } from "react-redux";
import {
	fetchFreightsStart,
	fetchFreightsSuccess,
	fetchFreightsFailure,
	createFreightStart,
	createFreightSuccess,
	createFreightFailure,
} from "@/store/slices/freightSlice";
import { FreightService } from "@/services/freightService";
import { Freight } from "@/utils/types/Freight";
import { PageInfo } from "@/utils/types/PageInfo";
import { FreightFilters } from "@/utils/types/FreightFilters";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";

export const useFreightController = () => {
	const dispatch = useDispatch();

	const loadFreights = async (
		filters: FreightFilters,
		page: number,
		limit: number
	) => {
		console.log("Loading Freights with Filters:", filters);
		dispatch(fetchFreightsStart());
		try {
			const response = await FreightService.getFreights(filters, page, limit);
			console.log("Resposta do backend:", response);

			const transformedFreights: Freight[] = FreightService.transformFreights(
				response.data
			);

			const pageInfo: PageInfo = FreightService.transformPageInfo(
				response.pageInfo
			);

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

	const createFreight = async (input: CreateFreightInput): Promise<void> => {
		dispatch(createFreightStart());
		try {
			const newFreight = await FreightService.createFreight(input);
			dispatch(createFreightSuccess(newFreight));
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			dispatch(createFreightFailure(errorMessage));
		}
	};

	return {
		loadFreights,
		loadFreightById,
		createFreight,
	};
};
