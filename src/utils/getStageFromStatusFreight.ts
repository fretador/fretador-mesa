import { FreightStatus } from "./enums/freightStatusEnum";

export const getStageFromStatus = (status: FreightStatus): number => {
	const stageMap: { [key in FreightStatus]?: number } = {
		[FreightStatus.WAITING]: 0,
		[FreightStatus.TARGETED]: 0,
		[FreightStatus.REQUESTED]: 0,
		[FreightStatus.APPROVED]: 0,
		[FreightStatus.ACCEPTED]: 0,
		[FreightStatus.DRIVER_SELECTED]: 0,
		[FreightStatus.PICKUP_ORDER_SENT]: 0,
		[FreightStatus.INVOICE_SENT]: 0,
		[FreightStatus.LOADING_STARTED]: 1,
		[FreightStatus.LOADING_FINISHED]: 2,
		[FreightStatus.ROUTE_IN_PROGRESS]: 2,
		[FreightStatus.UNLOADING_STARTED]: 3,
		[FreightStatus.UNLOADING_FINISHED]: 3,
		[FreightStatus.DRIVER_ARRIVED]: 3,
		[FreightStatus.INVOICE_COUPON_SENT]: 4,
		[FreightStatus.INVOICE_COUPON_REFUSED]: 4,
		[FreightStatus.FINISHED]: 5,
		[FreightStatus.OPERATION_REQUIRED]: 3,
		[FreightStatus.OPERATION_APPROVED]: 3,
		[FreightStatus.ADMIN_REQUIRED]: 4,
		[FreightStatus.ADMIN_APPROVED]: 4,
		[FreightStatus.FINANCIAL_REQUIRED]: 5,
		[FreightStatus.FINANCIAL_APPROVED]: 5,
	};
	return stageMap[status] || 0;
};
