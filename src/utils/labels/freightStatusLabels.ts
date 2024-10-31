import { FreightStatus } from "@/utils/enums/freightStatusEnum";

export const freightStatusLabels: {
	[key in keyof typeof FreightStatus]: string;
} = {
	WAITING: "Aguardando Motorista",
	TARGETED: "Motorista Selecionado",
	REQUESTED: "Frete Solicitado",
	APPROVED: "Frete Aprovado",
	ACCEPTED: "Frete Aceito",
	PICKUP_ORDER_SENT: "Ordem de Coleta Enviada",
	OPERATION_REQUIRED: "Operação Necessária",
	OPERATION_APPROVED: "Operação Aprovada",
	ADMIN_REQUIRED: "Administração Necessária",
	ADMIN_APPROVED: "Administração Aprovada",
	FINANCIAL_REQUIRED: "Financeiro Necessário",
	FINANCIAL_APPROVED: "Financeiro Aprovado",
	LOADING_STARTED: "Carregamento Iniciado",
	LOADING_FINISHED: "Carregamento Finalizado",
	UNLOADING_STARTED: "Descarregamento Iniciado",
	UNLOADING_FINISHED: "Descarregamento Finalizado",
	INVOICE_SENT: "Nota Fiscal Enviada",
	INVOICE_COUPON_SENT: "Cupom da Nota Fiscal Enviado",
	INVOICE_COUPON_REFUSED: "Cupom da Nota Fiscal Recusado",
	DRIVER_ARRIVED: "Motorista Chegou",
	DRIVER_SELECTED: "Motorista Selecionado",
	FINISHED: "Finalizado",
	CANCELED: "Cancelado",
};
