// Tipos para GetFreightCountByStatus
export interface FreightCountByStatus {
	status: string;
	count: number;
}

export interface GetFreightCountByStatusData {
	getFreightCountByStatus: FreightCountByStatus[];
}

// Tipos para GetFreightWeeklyFlow
export interface FreightWeeklyFlow {
	dayOfWeek: string;
	count: number;
}

export interface GetFreightWeeklyFlowData {
	getFreightWeeklyFlow: FreightWeeklyFlow[];
}

// Tipos para GetFreightDailyFlow
export interface FreightDailyFlow {
	newFreights: number;
	canceledFreightsPercentage: number;
}

export interface GetFreightDailyFlowData {
	getFreightDailyFlow: FreightDailyFlow;
}

// Tipos para GetFreightStatistics
export interface FreightStatistics {
	freightsOpen: number;
	freightsInProgress: number;
	freightsFinished: number;
}

export interface GetFreightStatisticsData {
	getFreightStatistics: FreightStatistics;
}

// Tipos para GetPendingApprovalFreights
export interface PendingApprovalFreight {
	freightCode: number;
	numCte: string;
	driver: string;
	photosCount: number;
	docsCount: number;
	totalCount: number;
}

export interface GetPendingApprovalFreightsData {
	getPendingApprovalFreights: PendingApprovalFreight[];
}
