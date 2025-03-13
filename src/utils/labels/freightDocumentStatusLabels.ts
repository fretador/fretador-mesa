import { FreightDocumentTypeEnum } from "@/utils/enums/freightDocumentTypeEnum";

export const freightDocumentTypeLabels: {
	[key in keyof typeof FreightDocumentTypeEnum]: string;
} = {
	PICKUP_ORDER: "Ordem de Coleta",
	CTE: "CT-e",
	MDF: "MDF-e",
	NF: "Nota Fiscal",
	PROOF_OF_PAYMENT: "Comprovante de Pagamento",
	RECEIPT: "Recibo",
	FREIGHT_CONTRACT: "Contrato de Frete",
	ICMS_GUIDE_GNRE: "Guia de ICMS (GNRE)",
	ADVANCE_RECEIPT: "Recibo de Adiantamento",
	BALANCE_RECEIPT: "Recibo de Saldo",
	OTHERS_DOCUMENTS: "Outros Documentos",
	OTHER_RECEIPTS: "Outros Recibos",
	FREIGHT_DOCUMENT: "Documento de Frete",
};
