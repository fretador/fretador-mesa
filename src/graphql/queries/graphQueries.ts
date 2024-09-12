import { gql } from "@apollo/client";

// Query para obter a contagem de fretes por status
export const GET_FREIGHT_COUNT_BY_STATUS = gql`
	query GetFreightCountByStatus {
		getFreightCountByStatus {
			status
			count
		}
	}
`;

// Query para obter o fluxo semanal de fretes
export const GET_FREIGHT_WEEKLY_FLOW = gql`
	query GetFreightWeeklyFlow {
		getFreightWeeklyFlow {
			dayOfWeek
			count
		}
	}
`;

// Query para obter o fluxo diário de fretes
export const GET_FREIGHT_DAILY_FLOW = gql`
	query GetFreightDailyFlow {
		getFreightDailyFlow {
			newFreights
			canceledFreightsPercentage
		}
	}
`;

// Query para obter as estatísticas gerais de fretes
export const GET_FREIGHT_STATISTICS = gql`
	query GetFreightStatistics {
		getFreightStatistics {
			freightsOpen
			freightsInProgress
			freightsFinished
		}
	}
`;

// Query para obter fretes pendentes de aprovação de comprovantes de entrega
export const GET_PENDING_APPROVAL_FREIGHTS = gql`
	query GetPendingApprovalFreights {
		getPendingApprovalFreights {
			freightCode
			numCte
			driver
			photosCount
			docsCount
			totalCount
		}
	}
`;
