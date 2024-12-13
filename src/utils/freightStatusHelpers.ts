import { FreightStatus } from "@/utils/enums/freightStatusEnum";

export const getNextStatus = (
	status: FreightStatus | null | undefined
): FreightStatus | null => {
	if (!status) {
		return null;
	}
	switch (status) {
		case FreightStatus.WAITING:
		case FreightStatus.TARGETED:
			return FreightStatus.APPROVED;

		case FreightStatus.REQUESTED:
			return FreightStatus.ACCEPTED;

		case FreightStatus.APPROVED:
			return FreightStatus.PICKUP_ORDER_SENT;

		case FreightStatus.ACCEPTED:
			return FreightStatus.PICKUP_ORDER_SENT;

		case FreightStatus.PICKUP_ORDER_SENT:
		case FreightStatus.INVOICE_SENT:
			return FreightStatus.LOADING_STARTED;

		case FreightStatus.LOADING_STARTED:
			return FreightStatus.LOADING_FINISHED;

		case FreightStatus.LOADING_FINISHED:
			return FreightStatus.ROUTE_IN_PROGRESS;

		case FreightStatus.ROUTE_IN_PROGRESS:
			return FreightStatus.DRIVER_ARRIVED;

		case FreightStatus.DRIVER_ARRIVED:
			return FreightStatus.UNLOADING_STARTED;

		case FreightStatus.UNLOADING_STARTED:
			return FreightStatus.UNLOADING_FINISHED;

		case FreightStatus.UNLOADING_FINISHED:
			return FreightStatus.INVOICE_COUPON_SENT;

		case FreightStatus.INVOICE_COUPON_SENT:
			return FreightStatus.ADMIN_REQUIRED;

		case FreightStatus.ADMIN_REQUIRED:
			return FreightStatus.ADMIN_APPROVED;

		case FreightStatus.ADMIN_APPROVED:
			return FreightStatus.FINANCIAL_REQUIRED;

		// case FreightStatus.FINANCIAL_REQUIRED:
		// 	return FreightStatus.FINANCIAL_APPROVED;

		case FreightStatus.FINANCIAL_APPROVED:
			return FreightStatus.FINISHED;
		default:
			return null;
	}
};

export const getStatusText = (
	status: FreightStatus | null | undefined
): string => {
	if (!status) {
		return "Ação Desconhecida";
	}
	switch (status) {
		case FreightStatus.WAITING:
			return "Autorizar Embarque";

		case FreightStatus.TARGETED:
			return "Aprovar Frete";

		case FreightStatus.REQUESTED:
			return "Aceitar Frete";

		case FreightStatus.APPROVED:
		case FreightStatus.ACCEPTED:
			return "Enviar Ordem de Coleta";

		case FreightStatus.PICKUP_ORDER_SENT:
		case FreightStatus.INVOICE_SENT:
			return "Carregar Carga";

		case FreightStatus.LOADING_STARTED:
			return "Finalizar Carregamento";

		case FreightStatus.LOADING_FINISHED:
			return "Iniciar Viagem";

		case FreightStatus.ROUTE_IN_PROGRESS:
			return "Chegou no Destino";

		case FreightStatus.DRIVER_ARRIVED:
			return "Iniciar Descarregamento";

		case FreightStatus.UNLOADING_STARTED:
			return "Finalizar Descarregamento";

		case FreightStatus.UNLOADING_FINISHED:
			return "Solicitar Comprovantes";

		case FreightStatus.INVOICE_COUPON_SENT:
			return "Analisar Comprovantes";

		case FreightStatus.ADMIN_REQUIRED:
			return "Administrativo aprovado";

		case FreightStatus.ADMIN_APPROVED:
			return "Solicitar Saldo";

		case FreightStatus.FINANCIAL_REQUIRED:
			return "Financeiro Necessário";

		case FreightStatus.FINANCIAL_APPROVED:
			return "Finalizar Frete";

		case FreightStatus.FINISHED:
			return "Frete Concluído";

		case FreightStatus.CANCELED:
			return "Frete Cancelado";
		default:
			return "Ação Desconhecida";
	}
};
